<?php

namespace App\Console\Commands;

use App\Http\Controllers\UtilsController;
use App\Models\Token;
use Illuminate\Console\Command;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CheckAppStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-app-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '检查程序状态并在需要时更新';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (config("database.default") === "no") {
            $this->error("请完整配置环境变量");
            return;
        }

        if (!Schema::hasTable('accounts')) {
            Schema::create("accounts", function (Blueprint $table) {
                $table->id();
                $table->text("baidu_name");
                $table->text("uk");
                $table->enum("account_type", ["cookie", "enterprise_cookie", "open_platform", "download_ticket"]);
                $table->json("account_data");
                $table->boolean("switch");
                $table->text("reason");
                $table->enum("prov", ["北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "香港特别行政区", "澳门特别行政区", "台湾省"])->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!Schema::hasTable('black_lists')) {
            Schema::create("black_lists", function (Blueprint $table) {
                $table->id();
                $table->enum("type", ["ip", "fingerprint"]);
                $table->text("identifier");
                $table->text("reason");
                $table->dateTime("expires_at");
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('file_lists')) {
            Schema::create("file_lists", function (Blueprint $table) {
                $table->id();
                $table->text("surl");
                $table->text("pwd");
                $table->text("fs_id");
                $table->unsignedBigInteger("size");
                $table->text("filename");
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('tokens')) {
            Schema::create("tokens", function (Blueprint $table) {
                $table->id();
                $table->text("token");
                $table->unsignedBigInteger("count");
                $table->unsignedBigInteger("size");
                $table->unsignedBigInteger("day");
                $table->unsignedBigInteger("can_use_ip_count");
                $table->json("ip");
                $table->boolean("switch");
                $table->text("reason");
                $table->dateTime("expires_at")->nullable();
                $table->timestamps();
                $table->softDeletes();
            });

            // 添加游客
            Token::query()->create([
                "token" => "guest",
                "count" => 10,
                "size" => 10 * UtilsController::$GB,
                "day" => 0,
                "can_use_ip_count" => 114514,
                "ip" => [],
                "switch" => true,
                "reason" => "",
                "expires_at" => "2099-01-01 00:00:00",
            ]);
        }

        if (!Schema::hasTable('records')) {
            Schema::create("records", function (Blueprint $table) {
                $table->id();
                $table->text("ip");
                $table->text("fingerprint");
                $table->unsignedBigInteger("fs_id");
                $table->json("urls");
                $table->text("ua");
                $table->unsignedBigInteger("token_id");
                $table->unsignedBigInteger("account_id");
                $table->timestamps();

                $table->foreign("fs_id")->references("id")->on("file_lists");
                $table->foreign("token_id")->references("id")->on("tokens");
                $table->foreign("account_id")->references("id")->on("accounts");
            });
        }

        $this->info("启动完成");
    }
}
