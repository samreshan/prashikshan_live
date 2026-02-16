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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone_number')->unique();
            $table->text('address')->nullable();
            $table->date('dob');
            $table->string('password');
            $table->unsignedBigInteger('insurance_company_id')->nullable();
            $table->unsignedBigInteger('insurance_product_id')->nullable();
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('insurance_company_id')->references('id')->on('insurance_companies')->onDelete('set null');
            $table->foreign('insurance_product_id')->references('id')->on('insurance_products')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
