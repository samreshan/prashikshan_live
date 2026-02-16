<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InsuranceCompanyController;
use App\Http\Controllers\InsuranceProductController;
use App\Http\Controllers\Admin\CustomerController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/profile', 'ProfileController@index')->name('profile');
Route::put('/profile', 'ProfileController@update')->name('profile.update');

Route::get('/about', function () {
    return view('about');
})->name('about');


Route::get('/admin/insurance-companies', [InsuranceCompanyController::class, 'index'])->name('insurance_companies.index');
Route::get('/admin/insurance-companies/create', [InsuranceCompanyController::class, 'create'])->name('insurance_companies.create');
Route::post('/admin/insurance-companies/store', [InsuranceCompanyController::class, 'store'])->name('insurance_companies.store');
Route::get('/admin/insurance-companies/edit/{insuranceCompany}', [InsuranceCompanyController::class, 'edit'])->name('insurance_companies.edit');
Route::put('/admin/insurance-companies/update/{insuranceCompany}', [InsuranceCompanyController::class, 'update'])->name('insurance_companies.update');
Route::delete('/admin/insurance-companies/destroy/{insuranceCompany}', [InsuranceCompanyController::class, 'destroy'])->name('insurance_companies.destroy');


// Use the correct controller namespace for customers
Route::prefix('admin')->group(function () {
    Route::resource('insurance_products', InsuranceProductController::class);
    Route::get('/insurance-products/{id}', [InsuranceProductController::class, 'show'])->name('insurance_products.show');

    // Add routes for customers using the Admin namespace
    Route::resource('customers', CustomerController::class);
    Route::get('/customers/suspects', [CustomerController::class, 'suspects'])->name('customers.suspects');
    Route::get('/customers/prospects', [CustomerController::class, 'prospects'])->name('customers.prospects');
});
