<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\Customer;

class SessionController extends Controller
{
    /**
     * Create a new session by logging in the customer.
     */
    public function createSession(Request $request)
    {
        try {
            // Validate login credentials
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            // Find customer by email
            $customer = Customer::where('email', $request->email)->first();

            // Check if the customer exists and the password is correct
            if (!$customer) {
                return response()->json([
                    'message' => 'Customer not found.',
                    'error' => 'The provided email is not associated with any account.',
                ], 404);
            }

            if (!Hash::check($request->password, $customer->password)) {
                return response()->json([
                    'message' => 'Invalid credentials.',
                    'error' => 'The provided password is incorrect.',
                ], 401);
            }

            // Create a token for the customer (API Token)
            $token = $customer->createToken('customer-token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'customer' => $customer->makeHidden(['password']),
            ], 200);
        } catch (ValidationException $e) {
            // Handle validation error
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Handle unexpected errors
            return response()->json([
                'message' => 'An unexpected error occurred',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Logout the authenticated customer and revoke token.
     */
    public function logout(Request $request)
    {
        // Ensure the user is authenticated
        if (!$request->user()) {
            return response()->json([
                'message' => 'Unauthorized',
                'error' => 'You need to be logged in to logout.',
            ], 401);
        }

        // Revoke the customer's token
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ], 200);
    }

    /**
     * Get the authenticated customer's session data.
     */
    public function getSessionData(Request $request)
    {
        // Ensure the user is authenticated
        if (!$request->user()) {
            return response()->json([
                'message' => 'Unauthorized',
                'error' => 'You need to be logged in to view session data.',
            ], 401);
        }

        return response()->json([
            'customer' => $request->user()->makeHidden(['password']),
        ], 200);
    }
}
