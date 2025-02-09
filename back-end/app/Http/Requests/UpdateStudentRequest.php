<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'studentName' => [
                'required',
                'string',
                'max:255',
                Rule::unique('students', 'studentName')->ignore($this->route('student')),
            ],
            'birthdate' => 'required|date',
            'fatherName' => 'required|string|max:255',
            'motherName' => 'required|string|max:255',
            'idDegree' => 'required|exists:degrees,id',
            'section' => 'required|string|max:10',
            'dateEntry' => 'required|date',
        ];
    }
}
