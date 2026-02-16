<?php

namespace App\Http\Controllers;

use App\Models\InsuranceCompany;
use App\Models\InsuranceProduct;
use Illuminate\Http\Request;

class InsuranceProductController extends Controller
{
    public function index()
    {
        // Using eager loading to reduce database queries for company
        $products = InsuranceProduct::with('company')->get();
        return view('admin.insurance_products.index', compact('products'));
    }

    public function create()
    {
        // Fetching all companies for the dropdown
        $companies = InsuranceCompany::all();
        return view('admin.insurance_products.create', compact('companies'));
    }

    public function store(Request $request)
    {
        // Validate incoming data
        $request->validate([
            'company_id' => 'required|exists:insurance_companies,id',
            'product_name' => 'required|string|max:255',
            'product_description' => 'nullable|string',
        ]);

        // Create the product entry in the database
        InsuranceProduct::create([
            'company_id' => $request->company_id,
            'product_name' => $request->product_name,
            'product_description' => $request->product_description,
        ]);

        // Redirecting with a success message
        return redirect()->route('insurance_products.index')->with('success', 'Product Added Successfully');
    }

    public function edit(InsuranceProduct $insuranceProduct)
    {
        // Fetch all companies for the dropdown
        $companies = InsuranceCompany::all();
        return view('admin.insurance_products.edit', compact('insuranceProduct', 'companies'));
    }

    public function update(Request $request, InsuranceProduct $insuranceProduct)
    {
        // Validate the incoming data
        $request->validate([
            'company_id' => 'required|exists:insurance_companies,id',
            'product_name' => 'required|string|max:255',
            'product_description' => 'nullable|string',
        ]);

        // Update the product with the validated data
        $insuranceProduct->update([
            'company_id' => $request->company_id,
            'product_name' => $request->product_name,
            'product_description' => $request->product_description,
        ]);

        // Redirecting with a success message
        return redirect()->route('insurance_products.index')->with('success', 'Product Updated Successfully');
    }

    public function show($id)
    {
        // Fetch the product by ID, including the associated company
        $product = InsuranceProduct::with('company')->findOrFail($id);
    
        // Return the 'admin.insurance_products.show' view
        return view('admin.insurance_products.show', compact('product'));
    }


    public function destroy(InsuranceProduct $insuranceProduct)
    {
        // Delete the insurance product from the database
        $insuranceProduct->delete();

        // Redirecting with a success message
        return redirect()->route('insurance_products.index')->with('success', 'Product Deleted Successfully');
    }
}
