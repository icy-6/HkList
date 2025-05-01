<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// 2.2.10 修复文件列表表 fs_id 索引
$indexes = DB::select('SHOW INDEXES FROM file_lists WHERE Column_name = ?', ['fs_id']);
if (empty($indexes)) {
    Schema::table('file_lists', function (Blueprint $table) {
        $table->string('fs_id', 255)->unique()->change();
    });
}