<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\SessionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Version 1 API routes
Route::prefix('v1')->group(function () {
    // Session management routes
    Route::post('login', [SessionController::class, 'createSession']);
    Route::post('logout', [SessionController::class, 'logout'])->middleware('auth:api');
    Route::get('session', [SessionController::class, 'getSessionData'])->middleware('auth:api');

    // Customer registration route
    Route::post('customers/register', [CustomerController::class, 'register']);
});
