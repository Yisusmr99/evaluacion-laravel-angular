<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Http\JsonResponse;
use Closure;

class AuthenticateJson extends Authenticate
{
    protected function unauthenticated($request, array $guards): JsonResponse
    {
        return response()->json([
            'message' => 'No autorizado. Token inválido o no enviado.',
            'result' => false
        ], 401);
    }
}
