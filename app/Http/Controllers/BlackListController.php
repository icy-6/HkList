<?php

namespace App\Http\Controllers;

use App\Models\BlackList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class BlackListController extends Controller
{
    public function select(Request $request)
    {
        $data = BlackList::query()
            ->orderBy($request["column"] ?? "id", $request["direction"] ?? "asc")
            ->get();

        return ResponseController::success($data);
    }

    public function insert(Request $request)
    {
        $validator = Validator::make($request->post(), [
            "type" => ["required", Rule::in("ip", "fingerprint")],
            "identifier" => "required|string",
            "reason" => "required|string",
            "expires_at" => "required|date"
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        BlackList::query()->create([
            "type" => $request["type"],
            "identifier" => $request["identifier"],
            "reason" => $request["reason"],
            "expires_at" => $request["expires_at"]
        ]);

        return ResponseController::success();
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->post(), [
            "id" => "required|array",
            "id.*" => "required|integer",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        BlackList::query()
            ->whereIn("id", $request["id"])
            ->delete();

        return ResponseController::success();
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->post(), [
            "type" => ["required", Rule::in("ip", "fingerprint")],
            "identifier" => "required|string",
            "reason" => "required|string",
            "expires_at" => "required|date",
            "id" => "required|array",
            "id.*" => "required|integer",
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        BlackList::query()
            ->whereIn("id", $request["id"])
            ->update([
                "type" => $request["type"],
                "identifier" => $request["identifier"],
                "reason" => $request["reason"],
                "expires_at" => $request["expires_at"]
            ]);

        return ResponseController::success();
    }
}
