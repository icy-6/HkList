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
    private function getCookieOrOpenPlatformInfo($accountType, $cookieOrAccessToken)
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
                "expires_at" => Carbon::createFromTimestamp($vipInfoData["expires_at"], config("app.timezone"))
            ],
            "switch" => 1,
            "reason" => "",
            "prov" => null,
            "used_at" => now()->format("Y-m-d H:i:s")
        ]);
    }

    private function getEnterpriseInfo($cookie)
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
                "expires_at" => $expires_at
            ],
            "switch" => !$is_expired,
            "reason" => $is_expired ? "企业套餐已过期" : "",
            "prov" => null,
            "used_at" => now()->format("Y-m-d H:i:s")
        ]);
    }

    private function getOpenPlatformInfo($refresh_token)
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
                "token_expires_at" => Carbon::createFromTimestamp($accessTokenData["expires_at"], config("app.timezone")),
                ...$accountInfoData["account_data"]
            ],
            "switch" => 1,
            "reason" => "",
            "prov" => null,
            "used_at" => now()->format("Y-m-d H:i:s")
        ]);
    }

    private function getDownLoadTicketInfo($surl, $pwd, $dir, $save_cookie, $download_cookie)
    {
        // 只需检查cookie是否有效
        $saveAccountInfo = BDWPApiController::getAccountInfo("cookie", $save_cookie);
        $saveAccountInfoData = $saveAccountInfo->getData(true);
        if ($saveAccountInfoData["code"] !== 200) return ResponseController::getAccountInfoFailed("save_cookie:" . $saveAccountInfoData["message"]);

        $downloadAccountInfo = BDWPApiController::getAccountInfo("cookie", $download_cookie);
        $downloadAccountInfoData = $downloadAccountInfo->getData(true);
        if ($downloadAccountInfoData["code"] !== 200) return ResponseController::getAccountInfoFailed("save_cookie:" . $downloadAccountInfoData["message"]);
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
                "save_cookie" => $save_cookie,
                "download_cookie" => $download_cookie
            ],
            "switch" => 1,
            "reason" => "",
            "prov" => null,
            "used_at" => now()->format("Y-m-d H:i:s")
        ]);
    }

    public function insert(Request $request)
    {
        $validator = Validator::make($request->post(), [
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
        $validator = Validator::make($request->post(), [
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
        $validator = Validator::make($request->post(), [
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
        $validator = Validator::make($request->post(), [
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
        $validator = Validator::make($request->post(), [
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

    public function select(Request $request)
    {
        $validator = Validator::make($request->post(), [
            "column" => ["nullable", "string", Rule::in(Account::$attrs)],
            "direction" => ["nullable", "string", Rule::in(["asc", "desc"])],
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $data = Account::query()
            ->orderBy($request["column"] ?? "id", $request["direction"] ?? "asc")
            ->get();

        return ResponseController::success($data);
    }

    const prov = ["北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "香港特别行政区", "澳门特别行政区", "台湾省"];

    public function update(Request $request)
    {
        $validator = Validator::make($request->post(), [
            "switch" => "required|boolean",
            "prov" => ["nullable", Rule::in(self::prov)],
            "id" => "required|array",
            "id.*" => "required|numeric",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $count = Account::query()
            ->whereIn("id", $request["id"])
            ->update([
                "switch" => $request["switch"],
                "reason" => $request["switch"] ? "手动启用" : "手动禁用",
                "prov" => $request["prov"]
            ]);

        if ($count === 0) {
            return ResponseController::updateFailed();
        } else {
            return ResponseController::success();
        }
    }

    public function updateInfo(Request $request)
    {
        $validator = Validator::make($request->post(), [
            "id" => "required|array",
            "id.*" => "required|numeric",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $accounts = Account::query()
            ->whereIn("id", $request["id"])
            ->get();

        foreach ($accounts as $account) {
            $account_data = $account["account_data"];

            $data = match ($request["account_type"]) {
                "cookie" => self::getCookieOrOpenPlatformInfo("cookie", $account_data["cookie"]),
                "enterprise_cookie" => self::getEnterpriseInfo($account_data["cookie"]),
                "open_platform" => self::getOpenPlatformInfo($account_data["refresh_token"]),
                "download_ticket" => self::getDownLoadTicketInfo($account_data["surl"], $account_data["pwd"], $account_data["dir"], $account_data["save_cookie"], $account_data["download_cookie"])
            };
            $data = $data->getData(true);
            if ($data["code"] !== 200) return $data;
            $data = $data["data"];

            $account->update($data);
        }

        return ResponseController::success();
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->post(), [
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
