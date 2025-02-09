<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('studentName');
            $table->date('birthdate');
            $table->string('fatherName');
            $table->string('motherName');
            $table->foreignId('idDegree')->constrained('degrees')->onDelete('cascade');
            $table->string('section');
            $table->date('dateEntry');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
