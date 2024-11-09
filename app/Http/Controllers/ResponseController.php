<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    public static function response($code, $statusCode, $message, $data = null)
    {
        return response()->json(
            [
                "code" => $code,
                "message" => $message,
                "data" => $data
            ],
            $statusCode
        );
    }

    public static function success($data = null)
    {
        return self::response(200, 200, "请求成功", $data);
    }

    public static function networkError($actionName)
    {
        return self::response(20001, 500, "在执行 $actionName 时遇到服务器网络异常");
    }

    public static function requestError($actionName, $data = null)
    {
        return self::response(20002, 500, "在执行 $actionName 时服务器提示参数有问题", $data);
    }

    public static function requestServerError($actionName, $data = null)
    {
        return self::response(20003, 500, "在执行 $actionName 时服务器侧出现错误", $data);
    }

    public static function unknownError($actionName, Exception $exception)
    {
        return self::response(20004, 500, "在执行 $actionName 时服务器侧出现错误,错误信息: " . $exception->getMessage(), $exception);
    }

    public static function paramsError($errors)
    {
        return self::response(20005, 500, "参数错误", config("app.debug") ? ["errors" => $errors] : null);
    }

    public static function getAccountInfoFailed($errmsg)
    {
        return self::response(20006, 500, "获取账户信息失败,errmsg: $errmsg");
    }

    public static function getAccessTokenFailed($errmsg)
    {
        return self::response(20007, 500, "换取AccessToken失败,errmsg: $errmsg");
    }

    public static function getSvipAtFailed($errmsg)
    {
        return self::response(20008, 500, "获取svip到期时间失败,errmsg: $errmsg");
    }

    public static function getEnterpriseInfoFailed($errmsg)
    {
        return self::response(20009, 500, "获取企业账号信息失败,errmsg: $errmsg");
    }

    public static function getAccountAPLFailed($errmsg)
    {
        return self::response(20010, 500, "获取账号封禁状态失败,errmsg: $errmsg");
    }

    public static function getFileListFailed($errno, $errtype)
    {
        return self::response(20011, 500, "获取分享链接信息失败,errno: $errno, errtype: $errtype");
    }

    public static function getVcodeFailed($errno)
    {
        return self::response(20012, 500, "获取验证码图片信息失败,errno: $errno");
    }

    public static function notFound($msg = "提供的数据查找不到对应数据", $data = null)
    {
        return self::response(20013, 404, $msg, $data);
    }

    public static function inBlackList()
    {
        return self::response(20014, 400, "处于黑名单中");
    }

    public static function installFailed($message)
    {
        return self::response(20015, 500, "安装失败,message: $message");
    }

    public static function wrongPass()
    {
        return self::response(20016, 400, "请检查密码是否正确");
    }

    public static function accountNotFound()
    {
        return self::response(20017, 400, "账号不存在");
    }
}
