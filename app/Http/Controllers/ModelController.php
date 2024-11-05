<?php

namespace App\Http\Controllers;

use App\Models\BlackList;
use Illuminate\Support\Facades\Validator;

class ModelController extends Controller
{
    public static string $tableClass = BlackList::class;

    public static array $insertValidate = [];

    public static array $updateValidate = [];

    public function _insert($data)
    {
        $validator = Validator::make($data, self::$insertValidate);

        if ($validator->fails()) return ResponseController::paramsError();

        $row = self::$tableClass::query()->create($data);
        return ResponseController::success($row);
    }

    public function _delete($ids)
    {
        $serialized = json_decode($ids);
        if ($serialized !== null) $ids = $serialized;
        $ids = is_array($ids) ? $ids : [$ids];
        $success = [];
        $failed = [];
        foreach ($ids as $id) {
            $blacklist = self::$tableClass::query()->find($id);
            if (!$blacklist) {
                $failed[] = $id;
                continue;
            }

            $blacklist->delete();
            $success[] = $id;
        }
        return ResponseController::success([
            "success" => $success,
            "failed" => $failed
        ]);
    }

    public function _update($ids, $data)
    {
        $serialized = json_decode($ids);
        if ($serialized !== null) $ids = $serialized;
        $ids = is_array($ids) ? $ids : [$ids];
        $success = [];
        $failed = [];
        $update = [];
        foreach (self::$updateValidate as $key => $_rule) {
            if ($data[$key]) $update[$key] = $data[$key];
        }
        foreach ($ids as $id) {
            $validator = Validator::make($data, self::$updateValidate);

            if ($validator->fails()) return ResponseController::paramsError();

            $row = self::$tableClass::query()->find($id);
            if (!$row) {
                $failed[] = $id;
                continue;
            }

            $row->update($update);
            $success[] = $id;
        }

        return ResponseController::success([
            "success" => $success,
            "failed" => $failed
        ]);
    }

    public function _get($order = "asc", $col = "id")
    {
        if (!$order) $order = "asc";
        if (!$col) $col = "id";
        $data = self::$tableClass::query()->orderBy($col, $order)->get();
        return ResponseController::success($data);
    }
}
