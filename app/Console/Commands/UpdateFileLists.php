<?php

namespace App\Console\Commands;

use App\Models\FileList;
use App\Models\Record;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UpdateFileLists extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-file-lists';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        set_time_limit(0);

        // 2.2.10 修复文件列表表 fs_id 索引
        $indexes = DB::select('SHOW INDEXES FROM file_lists WHERE Column_name = ?', ['fs_id']);
        if (empty($indexes)) {
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
                $total=FileList::query()->limit(1)->latest()->first()["id"];
                while (true) {
                    $_files = FileList::query()->paginate($perPage, ['*'], 'page', $page);
                    $files = $_files->getCollection();
                    if ($files->count() === 0) break;
                    $page++;
//if($total==0)$total=$_files->total();
                    foreach ($files as $file) {
                        $tempFile = DB::table("file_lists_temp")->where("fs_id", $file["fs_id"])->first();
                        // 进度
//                        $precent = $file["id"] / $total * 100;
                        //                      echo(date("Y-m-d H:i:s") . " id:" . $file["id"] . " fs_id:" . $file["fs_id"] . " prcennt:" . $precent . "\n");

                        // 如果存在,查找records表中对应数据
                        if ($tempFile) {
                            $ids = FileList::query()->where("fs_id", $file["fs_id"])->get()->pluck("id");

                            Record::query()
                                ->whereIn("fs_id", $ids)
                                ->update([
                                    "fs_id" => $tempFile->table_id
                                ]);

                            $needDelete = array_merge($needDelete, $ids->filter(fn($id) => $id !== $tempFile->table_id)->toArray());

                            if (count($needDelete) >= 60000) {
                                FileList::query()->whereIn("id", $needDelete)->delete();
                                $needDelete = [];
                                $page = 1;
                            }
                        } else {
                            DB::table("file_lists_temp")->insert([
                                "table_id" => $file["id"],
                                "fs_id" => $file["fs_id"]
                            ]);
                        }
                    }
                }

                FileList::query()->whereIn("id", $needDelete)->delete();

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
    }
}
