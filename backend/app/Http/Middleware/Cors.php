<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
{
    return $next($request)
    ->header('Access-Control-Allow-Origin', '*')
    ->header('Access-Control-Allow-Methods', '*')
    ->header('Access-Control-Allow-Headers', '*');
        // ->header('Access-Control-Allow-Origin', 'http://localhost:4200')
        // ->header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH')
        // ->header('Access-Control-Allow-Headers', 'Content-Type');
}
}