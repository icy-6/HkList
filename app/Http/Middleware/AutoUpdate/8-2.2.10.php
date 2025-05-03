<?php

use App\Models\FileList;
use App\Models\Record;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

set_time_limit(0);

// 2.2.10 修复文件列表表 fs_id 索引
$indexes = DB::select('SHOW INDEXES FROM file_lists WHERE Column_name = ?', ['fs_id']);
if (empty($indexes)) {
    if (Cache::get("fs_id_indexing")) throw new Exception("正在索引中,请稍后再试,如长时间未完成,请联系管理员");

    Cache::set("fs_id_indexing", true);

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
            $files = FileList::query()->paginate($perPage, ['*'], 'page', $page);
            $files = $files->getCollection();
            if ($files->count() === 0) break;
            $page++;

            $fsIds = $files->pluck('fs_id')->toArray();
            $tempFiles = DB::table("file_lists_temp")->whereIn("fs_id", $fsIds)->get()->keyBy('fs_id');

            foreach ($files as $file) {
                $tempFile = $tempFiles[$file->fs_id] ?? null;

                // 如果存在,查找records表中对应数据
                if ($tempFile) {
                    $ids = FileList::query()->where("fs_id", $file["fs_id"])->get()->pluck("id");

                    $recordIds = Record::query()
                        ->whereIn("fs_id", $ids)
                        ->get(['id', 'fs_id']);

                    // 批量更新 fs_id
                    foreach ($recordIds as $record) {
                        $allRecordsToUpdate[] = [
                            'id' => $record->id,
                            'fs_id' => $tempFile->table_id
                        ];
                    }

                    $needDelete = array_merge($needDelete, $ids->filter(fn($id) => $id !== $tempFile->table_id)->toArray());
                } else {
                    DB::table("file_lists_temp")->insert([
                        "table_id" => $file->id,
                        "fs_id" => $file->fs_id
                    ]);
                }
            }
        }

        foreach (array_chunk($allRecordsToUpdate, 5000) as $chunk) {
            Record::query()->update($chunk);
        }

        foreach (array_chunk($needDelete, 5000) as $chunk) {
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