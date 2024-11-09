<?php

namespace App\Http\Controllers;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\ServerException;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use XdbSearcher;

class UtilsController extends Controller
{
    public static function sendMail($actionName, $message, $subject)
    {
        if (!config("mail.switch")) return ResponseController::success();
        try {
            Mail::send("mails.error", [
                "name" => config("mail.from.name"),
                "message" => $message
            ], function (Message $message) use ($subject) {
                $message->to(config("mail.to.address"))->subject($subject);
            });
            return ResponseController::success();
        } catch (Exception $e) {
            return ResponseController::unknownError($actionName, $e);
        }
    }

    public static function sendRequest($actionName, $requestMethod, $requestUrl, $requestParams)
    {
        $http = new Client();
        try {
            $res = $http->request($requestMethod, $requestUrl, $requestParams);
            $data = Json::decode($res->getBody()->getContents()) ?? null;
            return ResponseController::success($data);
        } catch (ConnectException $e) {
            return ResponseController::networkError($actionName);
        } catch (ClientException $e) {
            $data = Json::decode($e->getResponse()->getBody()->getContents()) ?? null;
            return ResponseController::requestError($actionName, $data);
        } catch (ServerException $e) {
            $data = ["body" => $e->getResponse()->getBody()->getContents()];
            return ResponseController::requestServerError($actionName, $data);
        } catch (Exception $e) {
            return ResponseController::unknownError($actionName, $e);
        }
    }

    public static function decodeSecKey($seckey)
    {
        $seckey = str_replace("-", "+", $seckey);
        $seckey = str_replace("~", "=", $seckey);
        $seckey = str_replace("_", "/", $seckey);
        return $seckey;
    }

    // 省份标准名称映射表
    const provinces = [
        "北京" => "北京市",
        "天津" => "天津市",
        "上海" => "上海市",
        "重庆" => "重庆市",
        "河北" => "河北省",
        "山西" => "山西省",
        "内蒙古" => "内蒙古自治区",
        "辽宁" => "辽宁省",
        "吉林" => "吉林省",
        "黑龙江" => "黑龙江省",
        "江苏" => "江苏省",
        "浙江" => "浙江省",
        "安徽" => "安徽省",
        "福建" => "福建省",
        "江西" => "江西省",
        "山东" => "山东省",
        "河南" => "河南省",
        "湖北" => "湖北省",
        "湖南" => "湖南省",
        "广东" => "广东省",
        "广西" => "广西壮族自治区",
        "海南" => "海南省",
        "四川" => "四川省",
        "贵州" => "贵州省",
        "云南" => "云南省",
        "西藏" => "西藏自治区",
        "陕西" => "陕西省",
        "甘肃" => "甘肃省",
        "青海" => "青海省",
        "宁夏" => "宁夏回族自治区",
        "新疆" => "新疆维吾尔自治区",
        "香港" => "香港特别行政区",
        "澳门" => "澳门特别行政区",
        "台湾" => "台湾省"
    ];

    private static ?XdbSearcher $ip2region = null;

    public static function getProvinces($ip)
    {
        if (!self::$ip2region) self::$ip2region = new XdbSearcher();
        if ($ip === "0.0.0.0" || $ip === "::1") {
            $prov = "上海市";
        } else {
            try {
                $result = self::$ip2region->search($ip);
                if (!$result) {
                    $prov = "上海市";
                } else {
                    $prov = explode("|", $result)[2];
                }
            } catch (Exception $exception) {
                $prov = "上海市";
            }
        }

        foreach (self::provinces as $key => $standardName) {
            if (str_contains($prov, $key)) {
                return ResponseController::success([
                    "province" => $standardName
                ]);
            }
        }

        return ResponseController::success([
            "province" => "上海市"
        ]);
    }

    public static function updateEnv(array $data)
    {
        $envPath = base_path(".env");
        $contentArray = collect(file($envPath, FILE_IGNORE_NEW_LINES));

        $contentArray->transform(function ($item) use (&$data) {
            foreach ($data as $key => $value) {
                if (str_starts_with($item, $key . "=")) {
                    unset($data[$key]);
                    if (is_bool($value)) return $key . "=" . ($value ? "true" : "false");
                    return $key . "=" . $value;
                }
            }
            return $item;
        });

        if (count($data) !== 0) {
            $contentArray->add("");
            foreach ($data as $key => $value) {
                $contentArray->add($key . "=" . $value);
            }
        }

        $content = implode("\n", $contentArray->toArray());
        File::put($envPath, $content);
    }

    public static function getVersionString($env_arr): string
    {
        return $env_arr->filter(fn($env, $key) => $key === "_94LIST_VERSION")->first() ?? "0.0.0";
    }

    public static function getEnvFile($env_path): Collection
    {
        return collect(explode("\n", File::get($env_path)))
            ->filter(fn($line) => $line)
            ->map(fn($line) => explode("=", $line))
            ->mapWithKeys(fn($item) => [$item[0] => $item[1] ?? ""]);
    }
}
