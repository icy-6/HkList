<?php

namespace App\Http\Middleware;

use App\Http\Controllers\ResponseController;
use App\Models\BlackList;
use App\Models\Fingerprint;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class IdentifierFilter
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // debug 时不校验
        if (!config("app.debug")) {
            $ip = BlackList::query()->firstWhere(["type" => "ip", "identifier" => UtilsController::getIp($request)]);
            if ($ip) return ResponseController::inBlackList($ip["reason"]);

            $fingerprint = BlackList::query()->firstWhere(["type" => "fingerprint", "identifier" => $request["rand2"]]);
            if ($fingerprint) return ResponseController::inBlackList($fingerprint["reason"]);

            // 插入指纹
            $fingerprint = Fingerprint::query()->firstWhere(["fingerprint" => $request["rand2"]]);
            if (!$fingerprint) $fingerprint = Fingerprint::query()->create(["fingerprint" => $request["rand2"], "ip" => []]);
            if (!in_array(UtilsController::getIp($request), $fingerprint["ip"])) {
                $fingerprint->update([
                    "ip" => [...$fingerprint["ip"], UtilsController::getIp($request)]
                ]);
            }
            if (count($fingerprint["ip"]) > config("hklist.limit.fingerprint_for_ip")) return ResponseController::inBlackList("指纹绑定的IP超出上限");
        }

        return $next($request);
    }
}
