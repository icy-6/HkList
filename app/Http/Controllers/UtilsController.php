<?php

namespace App\Http\Controllers;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\ServerException;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;

class UtilsController extends Controller
{
    public static function sendMail($actionName, $message, $subject)
    {
        if (!config("mail.switch")) return ResponseController::success();
        try {
            Mail::send("mails.error", [
                "name" => config("mail.from.name"),
                "message" => $message
            ], function (Message $message) use ($subject) {
                $message->to(config("mail.to.address"))->subject($subject);
            });
            return ResponseController::success();
        } catch (Exception $e) {
            return ResponseController::unknownError($actionName, $e);
        }
    }

    public static function sendRequest($actionName, $requestMethod, $requestUrl, $requestParams)
    {
        $http = new Client();
        try {
            $res = $http->request($requestMethod, $requestUrl, $requestParams);
            $data = Json::decode($res->getBody()->getContents()) ?? null;
            return ResponseController::success($data);
        } catch (ConnectException $e) {
            return ResponseController::networkError($actionName);
        } catch (ClientException $e) {
            $data = Json::decode($e->getResponse()->getBody()->getContents()) ?? null;
            return ResponseController::requestError($actionName, $data);
        } catch (ServerException $e) {
            $data = ["body" => $e->getResponse()->getBody()->getContents()];
            return ResponseController::requestServerError($actionName, $data);
        } catch (Exception $e) {
            return ResponseController::unknownError($actionName, $e);
        }
    }

    public static function decodeSecKey($seckey)
    {
        $seckey = str_replace("-", "+", $seckey);
        $seckey = str_replace("~", "=", $seckey);
        $seckey = str_replace("_", "/", $seckey);
        return $seckey;
    }
}
