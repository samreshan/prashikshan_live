<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InsuranceProduct extends Model
{
    use HasFactory;

    protected $fillable = ['company_id', 'product_name', 'product_description', 'premium_amount', 'coverage_duration', 'insurance_category'];

    public function company()
    {
        return $this->belongsTo(InsuranceCompany::class, 'company_id');
    }
}
