<?php

namespace App\Http\Controllers\Config;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\UtilsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MailController extends Controller
{
    public function getConfig()
    {
        return ResponseController::success(config("mail"));
    }

    public function updateConfig(Request $request)
    {
        $validator = Validator::make($request->post(), [
            "mail_switch" => "required|boolean",
            "mail_host" => "required|string",
            "mail_port" => "required|numeric",
            "mail_username" => "required|string",
            "mail_password" => "required|string",
            "mail_from_address" => "required|string",
            "mail_from_name" => "required|string",
            "mail_to_address" => "required|string",
            "mail_to_name" => "required|string",
        ]);

        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        UtilsController::updateEnv([
            "MAIL_SWITCH" => $request["mail_switch"],
            "MAIL_HOST" => $request["mail_host"],
            "MAIL_PORT" => $request["mail_port"],
            "MAIL_USERNAME" => $request["mail_username"],
            "MAIL_PASSWORD" => $request["mail_password"],
            "MAIL_FROM_ADDRESS" => $request["mail_from_address"],
            "MAIL_FROM_NAME" => $request["mail_from_name"],
            "MAIL_TO_ADDRESS" => $request["mail_to_address"],
            "MAIL_TO_NAME" => $request["mail_to_name"],
        ]);

        return ResponseController::success();
    }

    public function sendTestMail()
    {
        if (!config("mail.switch")) return ResponseController::mailServiceIsNotEnable();
        return UtilsController::sendMail("MailController::sendTestMail", "测试邮件", "测试邮件的副标题");
    }
}
