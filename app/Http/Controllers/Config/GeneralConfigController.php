<?php

namespace App\Http\Controllers\Config;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\UtilsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GeneralConfigController extends Controller
{
    public function getConfig()
    {
        return ResponseController::success(config("hklist.general"));
    }

    public function updateConfig(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "new_admin_password" => "nullable|string",
            "parse_password" => "nullable|string",
            "show_announce" => "required|boolean",
            "announce" => "nullable|string",
            "custom_button" => "nullable|string",
            "name" => "required|string",
            "logo" => "required|string",
            "debug" => "required|boolean",
        ]);

        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        UtilsController::updateEnv([
            "HKLIST_ADMIN_PASSWORD" => $request["new_admin_password"] ?? "",
            "HKLIST_PARSE_PASSWORD" => $request["parse_password"] ?? "",
            "HKLIST_SHOW_ANNOUNCE" => $request["show_announce"],
            "HKLIST_ANNOUNCE" => $request["announce"] ?? "",
            "HKLIST_CUSTOM_BUTTON" => $request["custom_button"] ?? "",
            "APP_NAME" => $request["name"],
            "APP_LOGO" => $request["logo"],
            "APP_DEBUG" => $request["debug"]
        ]);

        return ResponseController::success();
    }
}
