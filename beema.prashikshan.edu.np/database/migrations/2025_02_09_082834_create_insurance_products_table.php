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
        Schema::create('insurance_products', function (Blueprint $table) {
            Schema::create('insurance_products', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('company_id'); // Foreign key to insurance_companies
                $table->string('product_name');
                $table->text('product_description')->nullable();
                $table->decimal('premium_amount', 10, 2)->nullable();
                $table->integer('coverage_duration')->nullable(); // Duration in months
                $table->enum('insurance_category', ['life', 'non-life'])->default('life')->nullable();
                $table->timestamps();
    
                // Foreign key constraint
                $table->foreign('company_id')->references('id')->on('insurance_companies')->onDelete('cascade');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insurance_products');
    }
};
