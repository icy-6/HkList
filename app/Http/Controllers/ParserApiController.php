<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ParserApiController extends Controller
{
    public static function getAuthInfo($parser_server, $parser_password)
    {
        $res = UtilsController::sendRequest(
            "BDWPApiController::getAccessToken",
            "get",
            "$parser_server/api/test_auth",
            [
                "json" => [
                    "token" => $parser_password,
                ]
            ]
        );

        $data = $res->getData(true);
        if ($data["code"] !== 200) return $res;

        return ResponseController::success($data["data"]);
    }
}
