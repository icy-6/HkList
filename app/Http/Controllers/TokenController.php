<?php

namespace App\Http\Controllers;

use App\Models\Token;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class TokenController extends Controller
{
    public function insert(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "type" => ["required", Rule::in(['set', 'generate'])],
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        if ($request["type"] === "set") {
            $validator = Validator::make($request->all(), [
                "token" => "required|string",
                "count" => "required|numeric",
                "size" => "required|numeric",
                "day" => "required|numeric",
                "can_use_ip_count" => "required|numeric"
            ]);
            if ($validator->fails()) return ResponseController::paramsError($validator->errors());

            Token::query()->create([
                "token" => $request["token"],
                "count" => $request["count"],
                "size" => $request["size"],
                "day" => $request["day"],
                "can_use_ip_count" => $request["can_use_ip_count"],
                "ip" => [],
                "switch" => true,
                "reason" => "",
                "expires_at" => null
            ]);
        } else {
            $validator = Validator::make($request->all(), [
                "generate_count" => "required|numeric",
                "count" => "required|numeric",
                "size" => "required|numeric",
                "day" => "required|numeric",
                "can_use_ip_count" => "required|numeric",
            ]);
            if ($validator->fails()) return ResponseController::paramsError($validator->errors());

            for ($i = 0; $i < $request["generate_count"]; $i++) {
                $token = Str::random();
                if (Token::query()->firstWhere("token", $token)) {
                    $i--;
                    continue;
                }
                Token::query()->create([
                    "token" => $token,
                    "count" => $request["count"],
                    "size" => $request["size"],
                    "day" => $request["day"],
                    "can_use_ip_count" => $request["can_use_ip_count"],
                    "ip" => [],
                    "switch" => true,
                    "reason" => "",
                    "expires_at" => null
                ]);
            }
        }

        return ResponseController::success();
    }

    public function select(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "column" => ["nullable", "string", Rule::in(Token::$attrs)],
            "direction" => ["nullable", "string", Rule::in(["asc", "desc"])],
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $data = Token::query()
            ->orderBy($request["column"] ?? "id", $request["direction"] ?? "asc")
            ->paginate($request["size"]);

        return ResponseController::success($data);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "id" => "required|array",
            "id.*" => "required|numeric",
            "count" => "required|numeric",
            "size" => "required|numeric",
            "day" => "required|numeric",
            "can_use_ip_count" => "required|numeric",
            "ip" => "nullable|array",
            "ip.*" => "required|string",
            "expires_at" => "required|date_format:Y-m-d H:i:s",
            "switch" => "required|boolean",
            "reason" => "nullable|string"
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $count = Token::query()
            ->whereIn("id", $request["id"])
            ->update([
                "count" => $request["count"],
                "size" => $request["size"],
                "day" => $request["day"],
                "can_use_ip_count" => $request["can_use_ip_count"],
                "ip" => $request["ip"],
                "expires_at" => $request["expires_at"],
                "switch" => $request["switch"],
                "reason" => $request["reason"]
            ]);

        if ($count === 0) {
            return ResponseController::updateFailed();
        } else {
            return ResponseController::success();
        }
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "id" => "required|array",
            "id.*" => "required|numeric",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $count = Token::query()
            ->whereIn("id", $request["id"])
            ->delete();

        if ($count === 0) {
            return ResponseController::deleteFailed();
        } else {
            return ResponseController::success();
        }
    }
}
