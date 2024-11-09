<?php

namespace App\Http\Middleware;

use App\Http\Controllers\ResponseController;
use App\Models\BlackList;
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
        $ip = BlackList::query()->firstWhere(["type" => "ip", "identifier" => $request->ip()]);
        if ($ip) return ResponseController::inBlackList();

        // debug 时不校验
        if (!config("app.debug")) {
            $validator = Validator::make($request->all(), ["fingerprint" => "required|string"]);
            if ($validator->fails()) return ResponseController::paramsError($validator->errors());
            $fingerprint = BlackList::query()->firstWhere(["type" => "fingerprint", "identifier" => $request["fingerprint"]]);
            if ($fingerprint) return ResponseController::inBlackList();
        }

        return $next($request);
    }
}
