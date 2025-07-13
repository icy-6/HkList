<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// 2.3.0 新增 enterprise_cookie_photography 账号类型
Schema::table("accounts", function (Blueprint $table) {
    $table->enum("account_type", ["cookie", "enterprise_cookie", "open_platform", "open_platform_nas", "download_ticket"])->change();
});