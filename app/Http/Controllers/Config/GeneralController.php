<?php

namespace App\Http\Controllers\Config;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\UtilsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GeneralController extends Controller
{
    public function getConfig()
    {
        return ResponseController::success(config("hklist.general"));
    }

    public function updateConfig(Request $request)
    {
        $validator = Validator::make($request->post(), [
            "admin_password" => "required|string",
            "parse_password" => "required|string",
            "show_announce" => "required|boolean",
            "announce" => "required|string",
            "custom_button" => "required|string"
        ]);

        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        UtilsController::updateEnv([
            "HKLIST_ADMIN_PASSWORD" => $request["admin_password"],
            "HKLIST_PARSE_PASSWORD" => $request["parse_password"],
            "HKLIST_SHOWANNOUNCE" => $request["show_announce"],
            "HKLIST_ANNOUNCE" => $request["announce"],
            "HKLIST_CUSTOMBUTTON" => $request["custom_button"]
        ]);

        return ResponseController::success();
    }
}
