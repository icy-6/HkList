<?php

namespace App\Http\Controllers;

use App\Models\Token;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
            ->withCount([
                'records as total_count',
                'records as today_count' => function ($query) {
                    $query->whereDate('created_at', Carbon::today(config("app.timezone")));
                }
            ])
            ->withSum([
                'records as total_size' => function ($query) {
                    $query->leftJoin('file_lists', 'file_lists.id', '=', 'records.fs_id');
                },
                'records as today_size' => function ($query) {
                    $query->leftJoin('file_lists', 'file_lists.id', '=', 'records.fs_id')
                        ->whereDate('records.created_at', Carbon::today(config("app.timezone")));
                }
            ], "file_lists.size")
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
            "expires_at" => "nullable|date_format:Y-m-d H:i:s",
            "switch" => "required|boolean",
            "reason" => "nullable|string",
            "token" => "nullable|string"
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $update = [
            "count" => $request["count"],
            "size" => $request["size"],
            "day" => $request["day"],
            "can_use_ip_count" => $request["can_use_ip_count"],
            "ip" => $request["ip"],
            "expires_at" => $request["expires_at"],
            "switch" => $request["switch"],
            "reason" => $request["reason"] ?? ""
        ];
        if (isset($request["token"])) $update["token"] = $request["token"];

        if (in_array(1, $request["id"])) {
            // 如果是guest
            if($request["token"]) return ResponseController::canNotChangeGuestToken();
        }

        $count = Token::query()
            ->whereIn("id", $request["id"])
            ->update($update);

        if ($count === 0) {
            return ResponseController::updateFailed();
        } else {
            return ResponseController::success();
        }
    }

    public function updateSwitch(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "id" => "required|array",
            "id.*" => "required|numeric",
            "switch" => "required|boolean",
            "reason" => "nullable|string"
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        if (in_array(1, $request["id"])) {
            // 如果是guest
            if($request["token"]) return ResponseController::canNotChangeGuestToken();
        }

        $count = Token::query()
            ->whereIn("id", $request["id"])
            ->update([
                "switch" => $request["switch"],
                "reason" => $request["reason"] ?? ""
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

        if (in_array(1, $request["id"])) {
            // 如果是guest
            if($request["token"]) return ResponseController::canNotChangeGuestToken();
        }

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
