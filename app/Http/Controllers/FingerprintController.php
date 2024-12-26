<?php

namespace App\Http\Controllers;

use App\Models\Fingerprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class FingerprintController extends Controller
{
    public function select(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "column" => ["nullable", "string", Rule::in(Fingerprint::$attrs)],
            "direction" => ["nullable", "string", Rule::in(["asc", "desc"])],
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $data = Fingerprint::query()
            ->orderBy($request["column"] ?? "id", $request["direction"] ?? "asc")
            ->paginate($request["size"]);

        return ResponseController::success($data);
    }
}
