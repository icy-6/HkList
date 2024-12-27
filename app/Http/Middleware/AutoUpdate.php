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

        return $next($request);
    }
}
