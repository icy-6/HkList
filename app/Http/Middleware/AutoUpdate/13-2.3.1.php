<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

// file_lists 表增加 uk、shareid、randsk 字段（如果不存在）

try {
    // 步骤1：检查当前数据库连接
    $currentDatabase = DB::connection()->getDatabaseName();
    //Log::info('当前连接的数据库: ' . $currentDatabase);

    // 步骤2：获取 file_lists 表的所有字段
    $columns = collect(DB::select("SHOW COLUMNS FROM file_lists"))->pluck('Field')->toArray();

    // 步骤3：依次判断并添加字段
    if (!in_array('uk', $columns)) {
        Schema::table('file_lists', function (Blueprint $table) {
            $table->string('uk', 255)->nullable()->after('pwd');
        });
        //Log::info('已添加 uk 字段');
    }
    if (!in_array('shareid', $columns)) {
        Schema::table('file_lists', function (Blueprint $table) {
            $table->string('shareid', 255)->nullable()->after('uk');
        });
        //Log::info('已添加 shareid 字段');
    }
    if (!in_array('randsk', $columns)) {
        Schema::table('file_lists', function (Blueprint $table) {
            $table->text('randsk')->nullable()->after('shareid');
        });
        //Log::info('已添加 randsk 字段');
    }

    //Log::info('file_lists 字段检查与添加完成');

} catch (Exception $e) {
    Log::error('file_lists 字段迁移失败: ' . $e->getMessage());
    Log::error('错误详情: ' . $e->getTraceAsString());
    throw $e;
}