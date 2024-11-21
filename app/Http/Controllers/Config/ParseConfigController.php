<?php

namespace App\Http\Controllers\Config;

use App\Http\Controllers\Api\ParserApiController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\UtilsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ParseConfigController extends Controller
{
    public function getConfig()
    {
        return ResponseController::success(config("hklist.parse"));
    }

    public function updateConfig(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "parser_server" => "nullable|string",
            "parser_password" => "nullable|string",
            "proxy_server" => "nullable|boolean",
            "proxy_password" => "nullable|string",
            "user_agent" => "required|string",
            "parse_mode" => "required|numeric"
        ]);

        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        UtilsController::updateEnv([
            "HKLIST_PARSER_SERVER" => $request["parser_server"],
            "HKLIST_PARSER_PASSWORD" => $request["parser_password"],
            "HKLIST_PROXY_SERVER" => $request["proxy_server"],
            "HKLIST_PROXY_PASSWORD" => $request["proxy_password"],
            "HKLIST_USER_AGENT" => $request["user_agent"],
            "HKLIST_PARSE_MODE" => $request["parse_mode"]
        ]);

        return ResponseController::success();
    }

    public function testAuth()
    {
        $parse = config("hklist.parse");
        if ($parse["parser_server"] === "" || $parse["parser_password"] === "") return ResponseController::parserServerNotDefined();
        return ParserApiController::getAuthInfo($parse["parser_server"], $parse["parser_password"]);
    }
}
