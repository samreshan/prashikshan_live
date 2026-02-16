<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InsuranceCompany;

class InsuranceCompanyController extends Controller
{
    /**
     * Display a listing of the companies.
     */
    public function index()
    {
        $companies = InsuranceCompany::with('products')->get();
        return view('admin.insurance_companies.index', compact('companies'));
    }

    /**
     * Show the form for creating a new company.
     */
    public function create()
    {
        return view('admin.insurance_companies.create');
    }

    /**
     * Store a newly created company in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:insurance_companies,name',
            'insurance_type' => 'required|in:life,non-life',
            'address' => 'nullable|string',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        $company = new InsuranceCompany($request->except('logo'));

        // Handle file upload
        if ($request->hasFile('logo')) {
            $company->logo = $request->file('logo')->store('logos', 'public');
        }

        $company->save();

        return redirect()->route('insurance_companies.index')->with('success', 'Insurance Company added successfully!');
    }

    /**
     * Show the form for editing the specified company.
     */
    public function edit(InsuranceCompany $insuranceCompany)
    {
        return view('admin.insurance_companies.edit', compact('insuranceCompany'));
    }

    /**
     * Update the specified company.
     */
    public function update(Request $request, InsuranceCompany $insuranceCompany)
    {
        $request->validate([
            'name' => 'required|unique:insurance_companies,name,' . $insuranceCompany->id,
            'insurance_type' => 'required|in:life,non-life',
            'address' => 'nullable|string',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        $insuranceCompany->update($request->except('logo'));

        if ($request->hasFile('logo')) {
            $insuranceCompany->logo = $request->file('logo')->store('logos', 'public');
        }

        $insuranceCompany->save();

        return redirect()->route('insurance_companies.index')->with('success', 'Company updated successfully!');
    }

    /**
     * Remove the specified company from storage.
     */
    public function destroy(InsuranceCompany $insuranceCompany)
    {
        $insuranceCompany->delete();
        return redirect()->route('insurance_companies.index')->with('success', 'Company deleted successfully!');
    }
}
