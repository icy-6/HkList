<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\UtilsController;

class ParserApiController extends Controller
{
    /**
     * {
     *     "valid": true,
     *     "expires_at": "2025-09-10 23:59:59"
     * }
     */
    public static function getAuthInfo($parser_server, $parser_password)
    {
        $res = UtilsController::sendRequest(
            "ParserApiController::getAuthInfo",
            "get",
            "$parser_server/api/test_auth",
            ["json" => ["token" => $parser_password]]
        );

        $data = $res->getData(true);
        if ($data["code"] !== 200) return $res;

        return ResponseController::success($data["data"]);
    }
}
