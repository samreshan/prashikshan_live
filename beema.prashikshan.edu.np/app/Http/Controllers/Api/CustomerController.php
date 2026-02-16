<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class CustomerController extends Controller
{

    public function register(Request $request)
    {
        try {
            // Validate incoming data
            $validated = $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'phone_number' => 'required|string|max:15|unique:customers,phone_number',
                'email' => 'required|string|email|max:255|unique:customers,email',
                'address' => 'required|string',
                'dob' => 'required|date',
                'password' => 'required|string|min:8|confirmed',
                'insurance_company_id' => 'nullable|exists:insurance_companies,id',
                'insurance_product_id' => 'nullable|exists:insurance_products,id',
            ]);

            // Create a new customer with hashed password
            $customer = Customer::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'phone_number' => $validated['phone_number'],
                'email' => $validated['email'],
                'address' => $validated['address'],
                'dob' => $validated['dob'],
                'password' => Hash::make($validated['password']),
                'insurance_company_id' => $validated['insurance_company_id'] ?? null,
                'insurance_product_id' => $validated['insurance_product_id'] ?? null,
            ]);

            return response()->json([
                'message' => 'Customer registered successfully',
                'customer' => $customer->makeHidden(['password']),
            ], 201);
        } catch (ValidationException $e) {
            // Return validation errors with proper response code
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors() // This returns detailed validation error messages
            ], 422);
        } catch (\Exception $e) {
            // Handle unexpected errors
            return response()->json([
                'message' => 'An unexpected error occurred',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
