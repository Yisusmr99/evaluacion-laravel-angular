<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'studentName',
        'birthdate',
        'fatherName',
        'motherName',
        'idDegree',
        'section',
        'dateEntry',
    ];

    public function degree(): BelongsTo
    {
        return $this->belongsTo(Degree::class, 'idDegree');
    }
}
