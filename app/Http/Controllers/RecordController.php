<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class RecordController extends Controller
{
    public function select(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "column" => ["nullable", "string", Rule::in(Record::$attrs)],
            "direction" => ["nullable", "string", Rule::in(["asc", "desc"])],
        ]);
        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $data = Record::query()
            ->orderBy($request["column"] ?? "id", $request["direction"] ?? "asc")
            ->get();

        return ResponseController::success($data);
    }
}
