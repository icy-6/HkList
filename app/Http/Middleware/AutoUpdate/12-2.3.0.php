<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

// 2.3.0 新增 open_platform_nas 账号类型到 account_type 字段

try {
    //Log::info('开始执行 account_type 字段迁移...');
    
    // 步骤1：检查当前数据库连接
    $currentDatabase = DB::connection()->getDatabaseName();
    //Log::info('当前连接的数据库: ' . $currentDatabase);
    
    //步骤2：检查当前 account_type 字段定义
    $currentAccountType = DB::select("SHOW COLUMNS FROM accounts LIKE 'account_type'")[0];
    //Log::info('当前 account_type 字段定义: ' . $currentAccountType->Type);
    
    //步骤3：检查是否已经包含 open_platform_nas
    if (strpos($currentAccountType->Type, 'open_platform_nas') !== false) {
        //Log::info('account_type 中 open_platform_nas 类型已存在，跳过迁移');
        return;
    }
    
    // 直接执行添加 open_platform_nas 的 SQL
    $sql = "ALTER TABLE accounts MODIFY COLUMN account_type ENUM('cookie', 'enterprise_cookie', 'open_platform', 'open_platform_nas', 'download_ticket') NOT NULL";
    DB::statement($sql);
    
    // 步骤7：立即验证修改结果
    //Log::info('立即验证修改结果...');
    $newAccountType = DB::select("SHOW COLUMNS FROM accounts LIKE 'account_type'")[0];
    //Log::info('修改后的 account_type 字段定义: ' . $newAccountType->Type);
    
    if (strpos($newAccountType->Type, 'open_platform_nas') !== false) {
        //Log::info('account_type 字段迁移完成！open_platform_nas 已成功添加');
    } else {
        Log::error('account_type 字段迁移失败！open_platform_nas 未能添加');
        throw new Exception('account_type 字段中 open_platform_nas 类型添加失败');
    }
    
} catch (Exception $e) {
    Log::error('account_type 字段迁移失败: ' . $e->getMessage());
    Log::error('错误详情: ' . $e->getTraceAsString());
    throw $e;
}