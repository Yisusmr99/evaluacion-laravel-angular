<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Degree;

class DegreesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $degrees = [
            '1ro Primaria',
            '2do Primaria',
            '3ro Primaria',
            '4to Primaria',
            '5to Primaria',
            '6to Primaria',
        ];

        foreach ($degrees as $degree) {
            Degree::updateOrCreate(
                ['nameDegree' => $degree], // Buscar por nombre
                ['nameDegree' => $degree] // Si no existe, lo crea
            );
        }
    }
}
