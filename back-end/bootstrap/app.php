<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->appendToGroup('api', \App\Http\Middleware\AuthenticateJson::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (AuthenticationException $exception, $request) {
            return response()->json([
                'message' => 'No autorizado. Token inválido o no enviado.'
            ], 401);
        });

        $exceptions->render(function (RouteNotFoundException $exception, $request) {
            return response()->json([
                'message' => 'No autorizado. Ruta de login no definida.'
            ], 401);
        });

        $exceptions->render(function (\Throwable $exception, $request) {
            return response()->json([
                'message' => 'Error interno del servidor',
                'error' => $exception->getMessage(),
            ], 500);
        });
    })
    ->create();