<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BDWPApiController;
use App\Http\Controllers\Parsers\V1Controller;
use App\Models\Account;
use App\Models\FileList;
use App\Models\Record;
use App\Models\Token;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ParseController extends Controller
{
    public static function getConfig(Request $request)
    {
        $config = config("hklist");
        return ResponseController::success([
            "debug" => config("app.debug"),
            "need_password" => $config["general"]["parse_password"] !== "",
            "show_announce" => $config["general"]["show_announce"],
            "announce" => $config["general"]["announce"],
            "custom_button" => $config["general"]["custom_button"],
            "max_once" => $config["limit"]["max_once"],
            "min_single_filesize" => $config["limit"]["min_single_filesize"],
            "max_single_filesize" => $config["limit"]["max_single_filesize"],
            "have_account" => self::getRandomCookie($request)->getDate(true)["code"] === 200
        ]);
    }

    public function getLimit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "token" => "required|string",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $token = Token::query()->firstWhere("token", $request["token"]);
        if (!$token) return ResponseController::TokenNotExists();

        // 判断游客
        if ($request["token"] === "guest") {
            // 绑定指纹,每日刷新
            $records = Record::query()
                ->where("token_id", $token["id"])
                ->where(function (Builder $query) use ($request) {
                    $query->where("fingerprint", $request["fingerprint"])->orWhere("ip", $request->ip());
                })
                ->whereDate("records.created_at", "=", now())
                ->leftJoin("file_lists", "file_lists.fs_id", "=", "records.fs_id")
                ->selectRaw("SUM(size) as size,COUNT(*) as count")
                ->first();

            if (
                $records["count"] >= $token["count"] ||
                $records["size"] >= $token["size"]
            ) {
                return ResponseController::TokenQuotaHasBeenUsedUp();
            }

            return ResponseController::success([
                "count" => $token["count"] - $records["count"],
                "size" => $token["size"] - $records["size"],
                "expires_at" => $token["expires_at"]
            ]);
        }

        if (!in_array($request->ip(), $token["ip"])) {
            if (count($token["ip"]) >= $token["can_use_ip_count"]) return ResponseController::TokenIpHitMax();
            // 插入当前ip
            $token->update(["ip" => [$request->ip(), ...$token["ip"]]]);
        }

        // 检查是否已经过期
        if ($token["expires_at"] !== null && $token["expires_at"]->isPast()) return ResponseController::TokenExpired();

        $records = Record::query()
            ->where("token_id", $token["id"])
            ->leftJoin("file_lists", "file_lists.fs_id", "=", "records.fs_id")
            ->selectRaw("SUM(size) as size,COUNT(*) as count")
            ->first();

        if (
            $records["count"] >= $token["count"] ||
            $records["size"] >= $token["size"]
        ) {
            return ResponseController::TokenQuotaHasBeenUsedUp();
        }

        return ResponseController::success([
            "count" => $token["count"] - $records["count"],
            "size" => $token["size"] - $records["size"],
            "expires_at" => $token["expires_at"] ?? "未使用"
        ]);
    }

    public function getFileList(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "surl" => "required|string",
            "pwd" => "nullable|string",
            "dir" => "required|string",
            "page" => "nullable|numeric",
            "num" => "nullable|numeric",
            "order" => ["nullable", Rule::in(["time", "filename"])]
        ]);

        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $fileList = BDWPApiController::getFileList($request["surl"], $request["pwd"], $request["dir"], $request["page"], $request["num"], $request["order"]);
        $fileListData = $fileList->getData(true);
        if ($fileListData["code"] !== 200) return $fileList;
        $fileListData = $fileListData["data"];

        foreach ($fileListData["list"] as $file) {
            if ($file["is_dir"]) continue;

            $find = FileList::query()->firstWhere([
                "surl" => $request["surl"],
                "pwd" => $request["pwd"],
                "fs_id" => $file["fs_id"]
            ]);

            if ($find) {
                $find->update([
                    "size" => $file["size"],
                    "md5" => $file["md5"]
                ]);
            } else {
                FileList::query()->create([
                    "surl" => $request["surl"],
                    "pwd" => $request["pwd"],
                    "fs_id" => $file["fs_id"],
                    "size" => $file["size"],
                    "filename" => $file["server_filename"],
                ]);
            }
        }

        return ResponseController::success($fileListData);
    }

    public function getVcode()
    {
        return BDWPApiController::getVcode();
    }

    public static function getAccountType()
    {
        $parse_mode = config("hklist.parse.parse_mode");
        return match ($parse_mode) {
            // 正常模式
            1, 2, 3, 4, 6, 7, 8, 9 => ResponseController::success(["account_type" => "cookie", "account_data" => ["vip_type" => "超级会员"]]),
            // 开放平台
            5, 10 => ResponseController::success(["account_type" => "open_platform", "account_data" => ["vip_type" => "超级会员"]]),
            // 企业平台
            11 => ResponseController::success(["account_type" => "enterprise_cookie", "account_data" => []]),
            // 漏洞接口
            12 => ResponseController::success(["account_type" => "cookie", "account_data" => ["vip_type" => "普通用户"]]),
            // 下载卷接口
            13 => ResponseController::success(["account_type" => "download_ticket", "account_data" => []]),
            default => ResponseController::unknownParseMode()
        };
    }

    public static function getRandomCookie(Request $request, $makeNew = false)
    {
        $province = null;
        $limit_cn = config("hklist.limit.limit_cn");
        $limit_prov = config("hklist.limit.limit_prov");
        if ($limit_cn || $limit_prov) {
            $ip = $request->ip();
            $prov = UtilsController::getProvinces($ip);
            $provData = $prov->getData(true);
            if ($provData["code"] !== 200) return $prov;
            $provData = $provData["data"];

            if (config("hklist.limit.limit_cn") && !$provData["isCn"]) return ResponseController::unsupportedCountry();
            $province = $provData["province"];
        }

        $accountType = self::getAccountType();
        $accountTypeData = $accountType->getData(true);
        if ($accountTypeData["code"] !== 200) return $accountType;
        $accountTypeData = $accountTypeData["data"];

        // 解析模式需要超级会员
        $needPro = false;
        $account = Account::query()->where(["switch" => true, "account_type" => $accountTypeData["account_type"]]);
        if (!$makeNew && $province !== null) $account = $account->where("prov", $province);
        foreach ($accountTypeData["account_data"] as $key => $value) {
            if ($key === "vip_type" && $value === "超级会员") $needPro = true;
            $account = $account->where("account_data->" . $key, $value);
        }

        $max_download_daily_pre_account = config("hklist.limit.max_download_daily_pre_account");
        if ($max_download_daily_pre_account > 0) {
            $account = $account
                ->leftJoin("records", function ($join) {
                    $join->on("records.account_id", "=", "records.account_id")
                        ->whereDate("records.created_at", "=", now());
                })
                ->rightJoin("file_lists", function ($join) {
                    $join->on("file_lists.fs_id", "=", "records.fs_id");
                })
                ->select("accounts.*", DB::raw('IFNULL(SUM(file_lists.size), 0) as total_size'))
                ->having('total_size', '<', $max_download_daily_pre_account);
        }

        $account = $account->inRandomOrder()->first();

        if (!$account) {
            // 判断存不存在 prov
            // 如果有那么就判断有没有还没有分配 prov 的账号
            if ($province !== null && !$makeNew) {
                return self::getRandomCookie($request, true);
            } else {
                return ResponseController::accountIsNotEnough();
            }
        }

        // 判断账号是否需要续期
        $isExpired = self::refreshExpiredAccount($account, $needPro);
        $isExpiredData = $isExpired->getData(true);
        // 过期了获取一个新账号
        if ($isExpiredData["data"]["isExpired"]) return self::getRandomCookie($request);

        if ($makeNew) {
            $account->update([
                "prov" => $province
            ]);
        }

        return ResponseController::success($account);
    }

    private static function refreshExpiredAccount(Account $account, $needPro)
    {
        $account_type = $account["account_type"];
        $account_data = $account["account_data"];

        if ($account_type === "cookie" || $account_type === "enterprise_cookie") {
            // 忽略普通用户
            if ($account_data["vip_type"] === "普通用户") return ResponseController::success(["isExpired" => false]);
            $expires_at = Carbon::parse($account_data["expires_at"], config("app.timezone"));
            if (!$expires_at->isPast()) return ResponseController::success(["isExpired" => false]);
        } else if ($account_type === "open_platform") {
            $token_expires_at = Carbon::parse($account_data["token_expires_at"], config("app.timezone"));
            $expires_at = Carbon::parse($account_data["expires_at"], config("app.timezone"));
            if (!$token_expires_at->isPast() && !$expires_at->isPast()) return ResponseController::success(["isExpired" => false]);
        } else if ($account_type === "download_ticket") {
            // download_ticket 不校验是否过期
            return ResponseController::success(["isExpired" => false]);
        }

        $updateInfo = AccountController::updateInfo(["id" => [$account["id"]]], false);
        $updateInfoData = $updateInfo->getData(true);
        // 判断解析模式 需要是超级会员的模式
        if ($needPro) {
            // 判断账号现在的类型
            $newAccount = Account::query()->find($account["id"]);
            if ($newAccount["account_data"] !== "超级会员") {
                $account->update(["switch" => false, "reason" => "会员过期"]);
                return ResponseController::success(["isExpired" => true]);
            }
        }
        if ($updateInfoData["code"] === 200) return ResponseController::success(["isExpired" => false]);

        $account->update(["switch" => false, "reason" => "账号过期"]);
        return ResponseController::success(["isExpired" => true]);
    }

    public function getDownloadLinks(Request $request)
    {
        set_time_limit(0);

        $validator = Validator::make($request->all(), [
            "randsk" => "required|string",
            "uk" => "required|numeric",
            "shareid" => "required|numeric",
            "fs_id" => "required|array",
            "fs_id.*" => "required|numeric",
            "surl" => "required|string",
            "dir" => "required|string",
            "pwd" => "nullable|string",
            "token" => "required|string"
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        // 每次请求不能超过10个文件,请分割处理
        $max_once = config("hklist.limit.max_once");
        $limit = $max_once >= 10 ? 10 : $max_once;
        if (count($request["fs_id"]) > $limit) return ResponseController::filesOverLoaded();

        // 检查限制还能不能解析
        $checkLimitRes = self::getLimit($request);
        $checkLimitData = $checkLimitRes->getData(true);
        if ($checkLimitData["code"] !== 200) return $checkLimitRes;
        $checkLimitData = $checkLimitData["data"];

        // 检查文件数量是否小于剩余配额
        if (count($request["fs_id"]) > $checkLimitData["count"]) return ResponseController::tokenQuotaCountIsNotEnough();

        // 检查链接是否有效
        $valid = self::getFileList($request);
        $validData = $valid->getData(true);
        if ($validData["code"] !== 200) return $valid;

        // 获取文件列表
        $fileList = FileList::query()
            ->where(["surl" => $request["surl"], "pwd" => $request["pwd"]])
            ->whereIn("fs_id", $request["fs_id"])
            ->get();

        if ($fileList->count() !== count($request["fs_id"])) return ResponseController::unknownFsId();

        $min_filesize = config("hklist.limit.min_single_filesize");
        $max_filesize = config("hklist.limit.max_single_filesize");
        foreach ($fileList as $file) {
            if ($file["size"] < $min_filesize) return ResponseController::fileIsTooSmall();
            if ($file["size"] > $max_filesize) return ResponseController::fileIsTooBig();
        }

        // 检查文件总大小是否大于剩余配额
        if ($fileList->sum("size") > $checkLimitData["size"]) return ResponseController::tokenQuotaSizeIsNotEnough();

        $json = [
            "randsk" => $request["randsk"],
            "uk" => $request["uk"],
            "shareid" => $request["shareid"],
            "fs_id" => $request["fs_id"],
            "surl" => $request["surl"],
            "dir" => $request["dir"],
            "pwd" => $request["pwd"],
            "token" => $request["token"],
            "fingerprint" => $request["fingerprint"] ?? ""
        ];

        if (isset($request["vcode_input"])) {
            $validator = Validator::make($request->all(), [
                "vcode_input" => "required|string",
                "vcode_str" => "required|string"
            ]);
            if ($validator->fails()) return ResponseController::paramsError($validator->errors());

            $json["vcode_input"] = $request["vcode_input"];
            $json["vcode_str"] = $request["vcode_str"];
        }

        // 代理服务器未完成
        $response = match (config("hklist.parse.parse_mode")) {
            1 => V1Controller::request($request, $json)
        };
        $responseData = $response->getData(true);
        if ($responseData["code"] !== 200) return $response;
        $responseData = $responseData["data"];

        $responseData = collect($responseData)->map(function ($item) use ($request, $json) {
            $isLimit = false;
            if ($item["message"] !== "请求成功") return $item;

            foreach ($item["urls"] as $url) {
                if (!str_contains($url, "tsl=0") && !$isLimit) $isLimit = true;
            }

            Account::query()
                ->find($item["account_id"])
                ->update([
                    "last_use_at" => now(),
                    "switch" => !$isLimit,
                    "reason" => $isLimit ? "账号已限速" : ""
                ]);

            if ($isLimit) {
                $item["message"] = "账号已限速";
                unset($item["urls"]);
            } else {
                // 插入记录
                Record::query()->create([
                    "ip" => $request->ip(),
                    "fingerprint" => $json["fingerprint"],
                    "fs_id" => $item["fs_id"],
                    "url" => $item["urls"][0],
                    "ua" => $item["ua"],
                    "token_id" => Token::query()->firstWhere("token", $json["token"])["id"],
                    "account_id" => $item["account_id"],
                ]);
            }

            unset($item["account_id"]);

            return $item;
        });

        return ResponseController::success($responseData);
    }
}
