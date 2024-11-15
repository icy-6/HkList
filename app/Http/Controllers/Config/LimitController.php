<?php

namespace App\Http\Controllers\Config;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\UtilsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LimitController extends Controller
{
    public function getConfig()
    {
        return ResponseController::success(config("hklist.limit"));
    }

    public function updateConfig(Request $request)
    {
        $validator = Validator::make($request->post(), [
            "max_once" => "required|string",
            "min_single_filesize" => "required|numeric",
            "max_single_filesize" => "required|numeric",
            "limit_cn" => "required|boolean",
            "limit_prov" => "required|boolean"
        ]);

        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        UtilsController::updateEnv([
            "HKLIST_MAX_ONCE" => $request["max_once"],
            "HKLIST_MIN_SINGLE_FILESIZE" => $request["min_single_filesize"],
            "HKLIST_MAX_SINGLE_FILESIZE" => $request["max_single_filesize"],
            "HKLIST_LIMIT_CN" => $request["limit_cn"],
            "HKLIST_LIMIT_PROV" => $request["limit_prov"]
        ]);

        return ResponseController::success();
    }
}
