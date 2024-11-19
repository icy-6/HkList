<?php

namespace App\Http\Controllers;

use App\Models\BlackList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class BlackListController extends Controller
{
    public function insert(Request $request)
    {
        $validator = Validator::make($request->post(), [
            "type" => ["required", Rule::in("ip", "fingerprint")],
            "identifier" => "required|string",
            "reason" => "required|string",
            "ban_days" => "required|numeric"
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $blackList = BlackList::query()->firstWhere([
            "type" => $request["type"],
            "identifier" => $request["identifier"],
        ]);

        if ($blackList) return ResponseController::blackListExists();

        BlackList::query()->create([
            "type" => $request["type"],
            "identifier" => $request["identifier"],
            "reason" => $request["reason"],
            "expires_at" => now()->addDays($request["ban_days"])
        ]);

        return ResponseController::success();
    }

    public function select(Request $request)
    {
        $validator = Validator::make($request->post(), [
            "column" => ["nullable", "string", Rule::in(BlackList::$attrs)],
            "direction" => ["nullable", "string", Rule::in(["asc", "desc"])],
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $data = BlackList::query()
            ->orderBy($request["column"] ?? "id", $request["direction"] ?? "asc")
            ->get();

        return ResponseController::success($data);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->post(), [
            "id" => "required|array",
            "id.*" => "required|numeric",
            "type" => ["required", Rule::in("ip", "fingerprint")],
            "identifier" => "required|string",
            "reason" => "required|string",
            "expires_at" => "required|date_format:Y-m-d H:i:s"
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $count = BlackList::query()
            ->whereIn("id", $request["id"])
            ->update([
                "type" => $request["type"],
                "identifier" => $request["identifier"],
                "reason" => $request["reason"],
                "expires_at" => $request["expires_at"]
            ]);

        if ($count === 0) {
            return ResponseController::updateFailed();
        } else {
            return ResponseController::success();
        }
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->post(), [
            "id" => "required|array",
            "id.*" => "required|numeric",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $count = BlackList::query()
            ->whereIn("id", $request["id"])
            ->delete();

        if ($count === 0) {
            return ResponseController::deleteFailed();
        } else {
            return ResponseController::success();
        }
    }
}
