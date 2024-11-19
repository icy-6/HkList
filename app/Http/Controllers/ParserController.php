<?php

namespace App\Http\Controllers;

use App\Models\FileList;
use App\Models\Record;
use App\Models\Token;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ParserController extends Controller
{
    public function getConfig(Request $request)
    {
        $config = config("hklist");
        return ResponseController::success([
            "debug" => config("app.debug"),
            "need_password" => $config["general"]["parse_password"] !== "",
            "show_announce" => $config["general"]["show_announce"],
            "announce" => $config["general"]["announce"],
            "custom_button" => $config["general"]["custom_button"],
            "max_once" => $config["limit"]["max_once"],
            "min_single_filesize" => $config["limit"]["min_single_filesize"],
            "max_single_filesize" => $config["limit"]["max_single_filesize"],
            "have_account" => true
        ]);
    }

    public function getLimit(Request $request)
    {
        $validator = Validator::make($request->query(), [
            "token" => "required|string",
        ]);

        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $token = Token::query()->firstWhere("token", $request["token"]);
        if (!$token) return ResponseController::TokenNotExists();

        // 判断游客
        if ($request["token"] === "guest") {
            // 绑定指纹,每日刷新
            $records = Record::query()
                ->where("token_id", $token["id"])
                ->where(function (Builder $query) use ($request) {
                    $query->where("fingerprint", $request["fingerprint"])->orWhere("ip", $request->ip());
                })
                ->whereDate("records.created_at", "=", now())
                ->leftJoin("file_lists", "file_lists.fs_id", "=", "records.fs_id")
                ->selectRaw("SUM(size) as size,COUNT(*) as count")
                ->first();

            if (
                $records["count"] >= $token["count"] ||
                $records["size"] >= $token["size"]
            ) {
                return ResponseController::TokenQuotaHasBeenUsedUp();
            }

            return ResponseController::success([
                "count" => $token["count"] - $records["count"],
                "size" => $token["size"] - $records["size"],
                "expires_at" => $token["expires_at"]
            ]);
        }

        if (!in_array($request->ip(), $token["ip"])) {
            if (count($token["ip"]) >= $token["can_use_ip_count"]) return ResponseController::TokenIpHitMax();
            // 插入当前ip
            $token->update(["ip" => [$request->ip(), ...$token["ip"]]]);
        }

        // 检查是否已经过期
        if ($token["expires_at"] !== null && $token["expires_at"]->isPast()) return ResponseController::TokenExpired();

        $records = Record::query()
            ->where("token_id", $token["id"])
            ->leftJoin("file_lists", "file_lists.fs_id", "=", "records.fs_id")
            ->selectRaw("SUM(size) as size,COUNT(*) as count")
            ->first();

        if (
            $records["count"] >= $token["count"] ||
            $records["size"] >= $token["size"]
        ) {
            return ResponseController::TokenQuotaHasBeenUsedUp();
        }

        return ResponseController::success([
            "count" => $token["count"] - $records["count"],
            "size" => $token["size"] - $records["size"],
            "expires_at" => $token["expires_at"] ?? "未使用"
        ]);
    }

    public function getFileList(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "surl" => "required|string",
            "pwd" => "nullable|string",
            "dir" => "required|string",
            "page" => "nullable|numeric",
            "num" => "nullable|numeric",
            "order" => ["nullable", Rule::in(["time", "filename"])]
        ]);

        if ($validator->fails()) return ResponseController::paramsError($validator->errors());

        $fileList = BDWPApiController::getFileList($request["surl"], $request["pwd"], $request["dir"], $request["page"], $request["num"], $request["order"]);
        $fileListData = $fileList->getData(true);
        if ($fileListData["code"] !== 200) return $fileList;
        $fileListData = $fileListData["data"];

        foreach ($fileListData["list"] as $file) {
            if ($file["is_dir"]) continue;

            $find = FileList::query()->firstWhere([
                "surl" => $request["surl"],
                "pwd" => $request["pwd"],
                "fs_id" => $file["fs_id"]
            ]);

            if ($find) {
                $find->update([
                    "size" => $file["size"],
                    "md5" => $file["md5"]
                ]);
            } else {
                FileList::query()->create([
                    "surl" => $request["surl"],
                    "pwd" => $request["pwd"],
                    "fs_id" => $file["fs_id"],
                    "size" => $file["size"],
                    "filename" => $file["server_filename"],
                ]);
            }
        }

        return ResponseController::success($fileListData);
    }

    public function getVcode()
    {
        return BDWPApiController::getVcode();
    }

    public function getDownloadLinks(Request $request)
    {

    }
}
