<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BDWPApiController;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AccountController extends Controller
{
    public function select(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "column" => ["nullable", "string", Rule::in(Account::$attrs)],
            "direction" => ["nullable", "string", Rule::in(["asc", "desc"])],
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $data = Account::query()
            ->withCount([
                'records as total_count',
                'records as today_count' => function ($query) {
                    $query->whereDate('created_at', now());
                }
            ])
            ->withSum([
                'records as total_size' => function ($query) {
                    $query->leftJoin('file_lists', 'file_lists.id', '=', 'records.fs_id');
                },
                'records as today_size' => function ($query) {
                    $query->leftJoin('file_lists', 'file_lists.id', '=', 'records.fs_id')
                        ->whereDate('records.created_at', now());
                }
            ], "file_lists.size")
            ->orderBy($request["column"] ?? "id", $request["direction"] ?? "asc")
            ->paginate($request["size"]);

        return ResponseController::success($data);
    }

    private static function getCookieOrOpenPlatformInfo($accountType, $cookieOrAccessToken)
    {
        // 获取账户信息
        $accountInfo = BDWPApiController::getAccountInfo($accountType, $cookieOrAccessToken);
        $accountInfoData = $accountInfo->getData(true);
        if ($accountInfoData["code"] !== 200) return $accountInfo;
        $accountInfoData = $accountInfoData["data"];

        // 获取 svip 到期时间
        $vipInfo = BDWPApiController::getSvipEndAt($accountType, $cookieOrAccessToken);
        $vipInfoData = $vipInfo->getData(true);
        if ($vipInfoData["code"] !== 200) return $vipInfo;
        $vipInfoData = $vipInfoData["data"];

        return ResponseController::success([
            "baidu_name" => $accountInfoData["baidu_name"],
            "uk" => $accountInfoData["uk"],
            "account_type" => $accountType,
            "account_data" => [
                $accountType => $cookieOrAccessToken,
                "vip_type" => $vipInfoData["vip_type"],
                "expires_at" => Carbon::createFromTimestamp($vipInfoData["expires_at"], config("app.timezone"))->format("Y-m-d H:i:s")
            ],
            "switch" => 1,
            "reason" => "",
            "prov" => null
        ]);
    }

    private static function getEnterpriseInfo($cookie)
    {
        // 获取账户信息
        $accountInfo = BDWPApiController::getAccountInfo("cookie", $cookie);
        $accountInfoData = $accountInfo->getData(true);
        if ($accountInfoData["code"] !== 200) return $accountInfo;
        $accountInfoData = $accountInfoData["data"];

        // 获取企业信息 (cid和到期时间)
        $enterpriseInfo = BDWPApiController::getEnterpriseInfo($cookie);
        $enterpriseInfoData = $enterpriseInfo->getData(true);
        if ($enterpriseInfoData["code"] !== 200) return $enterpriseInfo;
        $enterpriseInfoData = $enterpriseInfoData["data"];

        $expires_at = Carbon::createFromTimestamp($enterpriseInfoData["expires_at"], config("app.timezone"));
        $is_expired = $expires_at->isPast();

        return ResponseController::success([
            "baidu_name" => $accountInfoData["baidu_name"],
            "uk" => $accountInfoData["uk"],
            "account_type" => "enterprise_cookie",
            "account_data" => [
                "cookie" => $cookie,
                "cid" => $enterpriseInfoData["cid"],
                "expires_at" => $expires_at->format("Y-m-d H:i:s")
            ],
            "switch" => !$is_expired,
            "reason" => $is_expired ? "企业套餐已过期" : "",
            "prov" => null
        ]);
    }

    private static function getOpenPlatformInfo($refresh_token)
    {
        // 刷新token
        $accessToken = BDWPApiController::getAccessToken($refresh_token);
        $accessTokenData = $accessToken->getData(true);
        if ($accessTokenData["code"] !== 200) return $accessToken;
        $accessTokenData = $accessTokenData["data"];

        // 获取账户信息
        $accountInfo = self::getCookieOrOpenPlatformInfo("open_platform", $accessTokenData["access_token"]);
        $accountInfoData = $accountInfo->getData(true);
        if ($accountInfoData["code"] !== 200) return $accountInfo;
        $accountInfoData = $accountInfoData["data"];

        return ResponseController::success([
            "baidu_name" => $accountInfoData["baidu_name"],
            "uk" => $accountInfoData["uk"],
            "account_type" => "open_platform",
            "account_data" => [
                "access_token" => $accessTokenData["access_token"],
                "refresh_token" => $accessTokenData["refresh_token"],
                "token_expires_at" => Carbon::createFromTimestamp($accessTokenData["expires_at"], config("app.timezone"))->format("Y-m-d H:i:s"),
                ...$accountInfoData["account_data"]
            ],
            "switch" => 1,
            "reason" => "",
            "prov" => null
        ]);
    }

    private static function getDownLoadTicketInfo($surl, $pwd, $dir, $save_cookie, $download_cookie)
    {
        // 只需检查cookie是否有效
        $saveAccountInfo = BDWPApiController::getAccountInfo("cookie", $save_cookie);
        $saveAccountInfoData = $saveAccountInfo->getData(true);
        if ($saveAccountInfoData["code"] !== 200) return ResponseController::getAccountInfoFailed("save_cookie:" . $saveAccountInfoData["message"]);

        // 获取企业信息 (cid和到期时间)
        $enterpriseInfo = BDWPApiController::getEnterpriseInfo($save_cookie);
        $enterpriseInfoData = $enterpriseInfo->getData(true);
        if ($enterpriseInfoData["code"] !== 200) return $enterpriseInfo;
        $enterpriseInfoData = $enterpriseInfoData["data"];

        $saveTemplateVariableInfo = BDWPApiController::getTemplateVariable($save_cookie);
        $saveTemplateVariableInfoData = $saveTemplateVariableInfo->getData(true);
        if ($saveTemplateVariableInfoData["code"] !== 200) return $saveTemplateVariableInfo;
        $saveTemplateVariableInfoData = $saveTemplateVariableInfoData["data"];

        $downloadTemplateVariableInfo = BDWPApiController::getTemplateVariable($download_cookie);
        $downloadTemplateVariableInfoData = $downloadTemplateVariableInfo->getData(true);
        if ($downloadTemplateVariableInfoData["code"] !== 200) return $downloadTemplateVariableInfo;
        $downloadTemplateVariableInfoData = $downloadTemplateVariableInfoData["data"];

        $downloadAccountInfo = BDWPApiController::getAccountInfo("cookie", $download_cookie);
        $downloadAccountInfoData = $downloadAccountInfo->getData(true);
        if ($downloadAccountInfoData["code"] !== 200) return ResponseController::getAccountInfoFailed("download_cookie:" . $downloadAccountInfoData["message"]);
        $downloadAccountInfoData = $downloadAccountInfoData["data"];

        // 检查链接是否有效
        $fileList = BDWPApiController::getFileList($surl, $pwd, $dir);
        $fileListData = $fileList->getData(true);
        if ($fileListData["code"] !== 200) return $fileListData;

        return ResponseController::success([
            "baidu_name" => $downloadAccountInfoData["baidu_name"],
            "uk" => $downloadAccountInfoData["uk"],
            "account_type" => "download_ticket",
            "account_data" => [
                "surl" => $surl,
                "pwd" => $pwd,
                "dir" => $dir,
                "cid" => $enterpriseInfoData["cid"],
                "save_cookie" => $save_cookie,
                "save_bdstoken" => $saveTemplateVariableInfoData["bdstoken"],
                "download_cookie" => $download_cookie,
                "download_bdstoken" => $downloadTemplateVariableInfoData["bdstoken"],
            ],
            "switch" => 1,
            "reason" => "",
            "prov" => null
        ]);
    }

    public function insert(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "account_type" => ["required", Rule::in("cookie", "enterprise_cookie", "open_platform", "download_ticket")]
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        return match ($request["account_type"]) {
            "cookie" => self::insert_cookie($request),
            "enterprise_cookie" => self::insert_enterprise_cookie($request),
            "open_platform" => self::insert_open_platform($request),
            "download_ticket" => self::insert_download_ticket($request),
        };
    }

    private function insert_cookie(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "account_data" => "required|array",
            "account_data.*" => "required|array",
            "account_data.*.cookie" => "required|string",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $have_repeat = false;
        foreach ($request["account_data"] as $accountDatum) {
            $accountInfo = self::getCookieOrOpenPlatformInfo("cookie", $accountDatum["cookie"]);
            $accountInfoData = $accountInfo->getData(true);
            if ($accountInfoData["code"] !== 200) return $accountInfo;
            $accountInfoData = $accountInfoData["data"];

            $account = Account::query()->firstWhere(["account_type" => "cookie", "uk" => $accountInfoData["uk"]]);
            if ($account) {
                $have_repeat = true;
                continue;
            }

            Account::query()->create($accountInfoData);
        }

        return ResponseController::success([
            "have_repeat" => $have_repeat
        ]);
    }

    private function insert_enterprise_cookie(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "account_data" => "required|array",
            "account_data.*" => "required|array",
            "account_data.*.cookie" => "required|string",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $have_repeat = false;
        foreach ($request["account_data"] as $accountDatum) {
            $accountInfo = self::getEnterpriseInfo($accountDatum["cookie"]);
            $accountInfoData = $accountInfo->getData(true);
            if ($accountInfoData["code"] !== 200) return $accountInfo;
            $accountInfoData = $accountInfoData["data"];

            $account = Account::query()->firstWhere(["account_type" => "enterprise_cookie", "uk" => $accountInfoData["uk"]]);
            if ($account) {
                $have_repeat = true;
                continue;
            }

            Account::query()->create($accountInfoData);
        }

        return ResponseController::success([
            "have_repeat" => $have_repeat
        ]);
    }

    private function insert_open_platform(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "account_data" => "required|array",
            "account_data.*" => "required|array",
            "account_data.*.refresh_token" => "required|string",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $have_repeat = false;
        foreach ($request["account_data"] as $accountDatum) {
            $accountInfo = self::getOpenPlatformInfo($accountDatum["refresh_token"]);
            $accountInfoData = $accountInfo->getData(true);
            if ($accountInfoData["code"] !== 200) return $accountInfo;
            $accountInfoData = $accountInfoData["data"];

            $account = Account::query()->firstWhere(["account_type" => "open_platform", "uk" => $accountInfoData["uk"]]);
            if ($account) {
                $have_repeat = true;
                continue;
            }

            Account::query()->create($accountInfoData);
        }

        return ResponseController::success([
            "have_repeat" => $have_repeat
        ]);
    }

    private function insert_download_ticket(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "account_data" => "required|array",
            "account_data.*" => "required|array",
            "account_data.*.surl" => "required|string",
            "account_data.*.pwd" => "required|string",
            "account_data.*.dir" => "required|string",
            "account_data.*.save_cookie" => "required|string",
            "account_data.*.download_cookie" => "required|string",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $have_repeat = false;
        foreach ($request["account_data"] as $accountDatum) {
            $accountInfo = self::getDownLoadTicketInfo($accountDatum["surl"], $accountDatum["pwd"], $accountDatum["dir"], $accountDatum["save_cookie"], $accountDatum["download_cookie"]);
            $accountInfoData = $accountInfo->getData(true);
            if ($accountInfoData["code"] !== 200) return $accountInfo;
            $accountInfoData = $accountInfoData["data"];

            $account = Account::query()->firstWhere(["account_type" => "download_ticket", "uk" => $accountInfoData["uk"]]);
            if ($account) {
                $have_repeat = true;
                continue;
            }

            Account::query()->create($accountInfoData);
        }

        return ResponseController::success([
            "have_repeat" => $have_repeat
        ]);
    }

    const prov = ["北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "香港特别行政区", "澳门特别行政区", "台湾省"];

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "switch" => "nullable|boolean",
            "prov" => ["nullable", Rule::in(self::prov)],
            "id" => "required|array",
            "id.*" => "required|numeric",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $update = [];
        if (isset($request["switch"])) {
            $update["switch"] = $request["switch"];
            $update["reason"] = $request["switch"] ? "手动启用" : "手动禁用";
        }
        if (isset($request["prov"])) $update["prov"] = $request["prov"];

        $count = Account::query()
            ->whereIn("id", $request["id"])
            ->update($update);

        if ($count === 0) {
            return ResponseController::updateFailed();
        } else {
            return ResponseController::success();
        }
    }

    public static function updateInfo(Request $request, $data = [])
    {
        if (count($data) === 0) {
            $validator = Validator::make($request->all(), [
                "id" => "required|array",
                "id.*" => "required|numeric",
            ]);
            if ($validator->fails()) return ResponseController::paramsError($validator->errors());
        } else {
            $request = $data;
        }

        $accounts = Account::query()
            ->whereIn("id", $request["id"])
            ->get();

        foreach ($accounts as $account) {
            $account_data = $account["account_data"];
            $data = match ($account["account_type"]) {
                "cookie" => self::getCookieOrOpenPlatformInfo("cookie", $account_data["cookie"]),
                "enterprise_cookie" => self::getEnterpriseInfo($account_data["cookie"]),
                "open_platform" => self::getOpenPlatformInfo($account_data["refresh_token"]),
                "download_ticket" => self::getDownLoadTicketInfo($account_data["surl"], $account_data["pwd"], $account_data["dir"], $account_data["save_cookie"], $account_data["download_cookie"])
            };
            $update = $data->getData(true);
            if ($update["code"] !== 200) return $data;
            $update = $update["data"];

            $account->update($update);
        }

        return ResponseController::success();
    }

    public function checkBanStatus(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "id" => "required|array",
            "id.*" => "required|numeric",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $accounts = Account::query()
            ->whereIn("id", $request["id"])
            ->get();

        $res = [];
        foreach ($accounts as $account) {
            $account_data = $account["account_data"];
            $account_type = $account["account_type"];

            if ($account_type === "cookie" || $account_type === "enterprise_cookie") {
                $data = [
                    BDWPApiController::getAccountAPL("cookie", $account_data["cookie"])
                ];
            } else if ($account_type === "open_platform") {
                $data = [
                    BDWPApiController::getAccountAPL("open_platform", $account_data["open_platform"])
                ];
            } else if ($account_type === "download_ticket") {
                $data = [
                    BDWPApiController::getAccountAPL("cookie", $account_data["save_cookie"]),
                    BDWPApiController::getAccountAPL("cookie", $account_data["download_cookie"])
                ];
            } else {
                return ResponseController::unknownAccountType();
            }

            $res[] = [
                "id" => $account["id"],
                "account_type" => $account_type,
                "status" => array_map(fn($item) => $item->getData(true), $data)
            ];
        }

        return ResponseController::success($res);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "id" => "required|array",
            "id.*" => "required|numeric",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $count = Account::query()->whereIn("id", $request["id"])->delete();

        if ($count === 0) {
            return ResponseController::deleteFailed();
        } else {
            return ResponseController::success();
        }
    }
}
