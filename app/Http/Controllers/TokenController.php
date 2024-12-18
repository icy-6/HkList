<?php

namespace App\Http\Controllers;

use App\Models\Record;
use App\Models\Token;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class TokenController extends Controller
{
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
                    $query->whereDate('created_at', now());
                }
            ])
            ->withSum([
                'records as total_size' => function ($query) {
                    $query->leftJoin('file_lists', 'file_lists.id', '=', 'records.fs_id');
                },
                'records as today_size' => function ($query) {
                    $query->leftJoin('file_lists', 'file_lists.id', '=', 'records.fs_id')
                        ->whereDate('records.created_at', now());
                }
            ], "file_lists.size")
            ->orderBy($request["column"] ?? "id", $request["direction"] ?? "asc")
            ->paginate($request["size"]);

        return ResponseController::success($data);
    }

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

            $token = Token::query()->firstWhere("token", $request["token"]);
            if ($token) return ResponseController::TokenExists();

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

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "id" => "required|array",
            "id.*" => "required|numeric",
            "switch" => "nullable|boolean",
            "reason" => "nullable|string",
            "count" => "nullable|numeric",
            "size" => "nullable|numeric",
            "day" => "nullable|numeric",
            "can_use_ip_count" => "nullable|numeric",
            "ip" => "nullable|array",
            "ip.*" => "required|string|ip",
            "expires_at" => "nullable|date_format:Y-m-d H:i:s",
            "token" => "nullable|string"
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $update = ["reason" => $request["reason"] ?? "未指定原因"];
        if (isset($request["switch"])) $update["switch"] = $request["switch"];
        if (isset($request["count"])) $update["count"] = $request["count"];
        if (isset($request["size"])) $update["size"] = $request["size"];
        if (isset($request["day"])) $update["day"] = $request["day"];
        if (isset($request["can_use_ip_count"])) $update["can_use_ip_count"] = $request["can_use_ip_count"];
        if (isset($request["ip"])) $update["ip"] = $request["ip"];
        if (isset($request["expires_at"])) $update["expires_at"] = $request["expires_at"];

        if (count($request["id"]) < 1) {
            if ($request["token"]) {
                $update["token"] = $request["token"];

                // 如果是guest
                if (in_array(1, $request["id"])) return ResponseController::canNotChangeGuestToken("请不要修改游客的卡密值");
            }
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

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "id" => "required|array",
            "id.*" => "required|numeric",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        // 如果是guest
        if (in_array(1, $request["id"])) return ResponseController::canNotChangeGuestToken("请不要删除游客卡密");

        $count = Token::query()
            ->whereIn("id", $request["id"])
            ->delete();

        if ($count === 0) {
            return ResponseController::deleteFailed();
        } else {
            return ResponseController::success();
        }
    }

    public function getToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "token" => "required|string",
            "rand2" => "required|string"
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $token = Token::query()->firstWhere("token", $request["token"]);
        if (!$token) return ResponseController::TokenNotExists();
        $token = $token->toArray();

        $records = Record::query()->where("token_id", $token["id"]);
        if ($request["token"] === "guest") {
            $records = $records
                ->where(function (Builder $query) use ($request) {
                    $query->where("fingerprint", $request["rand2"])
                        ->orWhere("ip", $request->ip());
                })
                ->whereDate("records.created_at", "=", now());
        }
        $records = $records->leftJoin("file_lists", "file_lists.fs_id", "=", "records.fs_id")
            ->selectRaw("SUM(size) as size,COUNT(*) as count")
            ->first();

        return ResponseController::success([
            "token" => $token["token"],
            "count" => $token["count"],
            "size" => $token["size"],
            "remaining_count" => $token["count"] - $records["count"],
            "remaining_size" => $token["size"] - $records["size"],
            "ip" => $token["ip"],
            "created_at" => $token["created_at"],
            "expires_at" => $token["expires_at"],
        ]);
    }
}
