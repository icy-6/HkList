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
            "user_agent" => "required|string",
            "parse_mode" => "required|numeric",
            "use_exploit" => "required|boolean",
            "allow_folder" => "required|boolean",
            "ddddocr_server" => "nullable|string",
        ]);

        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        if (str_ends_with($request["parser_server"] ?? "", "/")) $request["parser_server"] = substr($request["parser_server"], 0, -1);
        if (str_ends_with($request["ddddocr_server"] ?? "", "/")) $request["ddddocr_server"] = substr($request["ddddocr_server"], 0, -1);

        UtilsController::updateEnv([
            "HKLIST_PARSER_SERVER" => $request["parser_server"] ?? "",
            "HKLIST_PARSER_PASSWORD" => $request["parser_password"] ?? "",
            "HKLIST_USER_AGENT" => $request["user_agent"],
            "HKLIST_PARSE_MODE" => $request["parse_mode"],
            "HKLIST_USE_EXPLOIT" => $request["use_exploit"],
            "HKLIST_ALLOW_FOLDER" => $request["allow_folder"],
            "HKLIST_DDDDOCR_SERVER" => $request["ddddocr_server"] ?? "",
        ]);

        return ResponseController::success();
    }

    public function testAuth()
    {
        $parse = config("hklist.parse");
        if ($parse["parser_server"] === "" || $parse["parser_password"] === "") return ResponseController::parserServerNotDefined();
        $res = ParserApiController::getAuthInfo($parse["parser_server"], $parse["parser_password"]);
        $resData = $res->getData(true);
        if ($resData["code"] !== 200) return $res;
        return ResponseController::success($resData["data"]);
    }
}
