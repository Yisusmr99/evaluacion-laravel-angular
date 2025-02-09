<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\UpdateStudentRequest;

class StudentController extends Controller
{
    // Obtener todos los estudiantes
    public function index(): JsonResponse
    {
        return response()->json([
            'result' => true,
            'data' => Student::with('degree')->get(), // 👈 Agregamos 'degree'
            'message' => 'Lista de estudiantes obtenida correctamente'
        ]);
    }

    // Crear un nuevo estudiante
    public function store(StoreStudentRequest $request): JsonResponse
    {
        $student = Student::create($request->validated());

        return response()->json([
            'result' => true,
            'data' => $student,
            'message' => 'Estudiante creado exitosamente'
        ], 201);
    }

    // Actualizar un estudiante
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());

        return response()->json([
            'message' => 'Estudiante actualizado correctamente',
            'student' => $student
        ]);
    }

    // Obtener estudiantes por id de grado
    public function getByDegree($idDegree): JsonResponse
    {
        $students = Student::with('degree')
        ->where('idDegree', $idDegree)
        ->get();

        if ($students->isEmpty()) {
            return response()->json([
                'result' => false,
                'message' => 'No se encontraron estudiantes para este grado'
            ], 404);
        }

        return response()->json([
            'result' => true,
            'data' => $students,
            'message' => 'Lista de estudiantes obtenida correctamente'
        ]);
    }

}
