<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Degree;
use Illuminate\Http\JsonResponse;

class DegreeController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'result' => true,
            'data' => Degree::all(),
            'message' => 'Lista de grados obtenida correctamente'
        ]);
    }

}
