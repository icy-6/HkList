<?php

namespace App\Http\Controllers;

use App\Models\BlackList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class BlackListController extends ModelController
{
    public static string $tableClass = BlackList::class;

    public function insert(Request $request)
    {
        self::$insertValidate = [
            "type" => ["required", Rule::in("ip", "fingerprint")],
            "identifier" => "required|string",
            "reason" => "required|string",
            "expired_at" => "required|date"
        ];
        return self::_insert($request->post());
    }

    public function delete(Request $request)
    {
        return self::_delete($request["id"]);
    }

    public function update(Request $request)
    {
        self::$updateValidate = [
            "type" => ["nullable", Rule::in("ip", "fingerprint")],
            "identifier" => "nullable|string",
            "reason" => "nullable|string",
            "expired_at" => "nullable|date"
        ];
        return self::_update($request["id"], $request->post());
    }

    public function get(Request $request)
    {
        return self::_get($request["order"], $request["column"]);
    }
}
