<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::all();
        return view('admin.customers.index', compact('customers'));
    }

    public function create()
    {
        return view('admin.customers.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'phone_number' => 'required|string|unique:customers,phone_number',
            'dob' => 'required|date',
            'password' => 'required|string|min:8|confirmed',
            'address' => 'nullable|string',
            'insurance_company_id' => 'nullable|exists:insurance_companies,id',
            'insurance_product_id' => 'nullable|exists:insurance_products,id',
        ]);

        $customer = Customer::create($validated);

        return redirect()->route('admin.customers.index')->with('success', 'Customer created successfully!');
    }

    public function edit($id)
    {
        $customer = Customer::findOrFail($id);
        return view('admin.customers.edit', compact('customer'));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email,' . $id,
            'phone_number' => 'required|string|unique:customers,phone_number,' . $id,
            'dob' => 'required|date',
            'password' => 'nullable|string|min:8|confirmed',
            'address' => 'nullable|string',
            'insurance_company_id' => 'nullable|exists:insurance_companies,id',
            'insurance_product_id' => 'nullable|exists:insurance_products,id',
        ]);

        $customer = Customer::findOrFail($id);

        // Remove password from validated data if it's null or empty
        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $customer->update($validated);

        return redirect()->route('admin.customers.index')->with('success', 'Customer updated successfully!');
    }

    public function show()
    {
        $customers = Customer::all();
        return view('admin.customers.index', compact('customers'));
    }


    public function suspects()
    {
        $customers = Customer::all();
        return view('admin.customers.suspects', compact('customers'));
    }

    public function prospects()
    {
        $customers = Customer::all();
        return view('admin.customers.prospects', compact('customers'));
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return redirect()->route('admin.customers.index')->with('success', 'Customer deleted successfully!');
    }
}
