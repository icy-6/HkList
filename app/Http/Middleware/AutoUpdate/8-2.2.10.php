<?php

use App\Models\FileList;
use App\Models\FileListsTemp;
use App\Models\Record;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

set_time_limit(0);

// 2.2.10 修复文件列表表 fs_id 索引
$indexes = DB::select('SHOW INDEXES FROM file_lists WHERE Column_name = ?', ['fs_id']);
if (empty($indexes)) {
    if (Cache::get("fs_id_indexing")) {
        $total_count = FileList::query()->count();
        $now_count = FileListsTemp::query()->count();
        $precent = round(($now_count / $total_count) * 100);
        throw new Exception("正在索引中,大致进度:{$precent},如长时间未完成,请联系管理员");
    }

    Cache::set("fs_id_indexing", true, $seconds = 60 * 60);

    try {
        Schema::dropIfExists("file_lists_temp");
        Schema::create("file_lists_temp", function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('table_id');
            $table->string('fs_id', 255)->unique()->index();
        });

        $page = 1;
        $perPage = 1000;
        $needDelete = [];
        $allRecordsToUpdate = [];

        while (true) {
            $files = FileList::query()->paginate($perPage, ['*'], 'page', $page)->getCollection();
            if ($files->count() === 0) break;
            $page++;

            $fsIds = $files->pluck('fs_id');
            $tempFiles = FileListsTemp::query()->whereIn("fs_id", $fsIds)->get()->keyBy("fs_id");

            foreach ($files as $file) {
                $tempFile = $tempFiles[$file["fs_id"]] ?? null;

                // 如果不存在,插入数据
                if (!$tempFile) {
                    $tempFiles[$file["fs_id"]] = [
                        "table_id" => $file["id"],
                        "fs_id" => $file["fs_id"]
                    ];
                    FileListsTemp::query()->create([
                        "table_id" => $file["id"],
                        "fs_id" => $file["fs_id"]
                    ]);
                    continue;
                }

                $ids = FileList::query()->where("fs_id", $file["fs_id"])->get()->pluck("id");

                $recordIds = Record::query()
                    ->whereIn("fs_id", $ids)
                    ->get(['id', 'fs_id']);

                // 批量更新 fs_id
                foreach ($recordIds as $record) {
                    $allRecordsToUpdate[] = [
                        'id' => $record["id"],
                        'fs_id' => $tempFile["table_id"]
                    ];
                }

                $needDelete = array_merge($needDelete, $ids->filter(fn($id) => $id !== $tempFile["table_id"])->toArray());
            }
        }

        foreach (array_chunk($allRecordsToUpdate, 50000) as $chunk) {
            $caseStatements = '';
            $ids = [];
            foreach ($chunk as $update) {
                $ids[] = $update["id"];
                $caseStatements .= "WHEN {$update['id']} THEN '{$update['fs_id']}' ";
            }

            $sql = "
        UPDATE records 
        SET fs_id = CASE id
            {$caseStatements}
            ELSE fs_id END
        WHERE id IN (" . implode(',', $ids) . ")
    ";

            DB::statement($sql);
        }

        foreach (array_chunk($needDelete, 50000) as $chunk) {
            FileList::query()->whereIn('id', $chunk)->delete();
        }

        Schema::dropIfExists("file_lists_temp");

        Schema::table('file_lists', function (Blueprint $table) {
            $table->string('fs_id', 255)->unique()->index()->change();
        });

        Cache::set("fs_id_indexing", false);
    } catch (Exception $e) {
        Cache::set("fs_id_indexing", false);
        throw $e;
    }
}