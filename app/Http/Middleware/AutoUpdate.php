<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\Response;

class AutoUpdate
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (config("database.default") === "no") return $next($request);

        // 2.0.7 新增指纹ip对应表
//        if (!Schema::hasTable('fingerprints')) {
//            Schema::create('fingerprints', function (Blueprint $table) {
//                $table->id();
//                $table->text("fingerprint");
//                $table->json("ip");
//                $table->timestamps();
//            });
//        }

        // 2.0.11 删除指纹表
        Schema::dropIfExists("fingerprints");

        // 2.1.12 新增 enterprise_cookie_photography 账号类型
        Schema::table("accounts", function (Blueprint $table) {
            $table->enum("account_type", ["cookie", "enterprise_cookie", "enterprise_cookie_photography", "open_platform", "download_ticket"])->change();
        });

        // 2.1.17 新增 daily 卡密类型
        if (!Schema::hasColumn("tokens", "token_type")) {
            Schema::table("tokens", function (Blueprint $table) {
                $table->enum("token_type", ["normal", "daily"])->after("token")->default("normal");
            });
        }

        return $next($request);
    }
}
