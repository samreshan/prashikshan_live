@extends('layouts.admin')

@section('main-content')
    <div class="container-fluid">
        <!-- Page Heading -->
        <h1 class="h3 mb-4 text-gray-900">{{ $product->product_name }}</h1>

        <!-- Product Details Card -->
        <div class="card shadow-lg mb-5 rounded-lg border-0">
            <div class="card-header bg-gradient-primary text-white rounded-top">
                <h6 class="m-0 font-weight-bold">Insurance Product Details</h6>
            </div>
            <div class="card-body bg-light">
                <div class="row mb-5">
                    <!-- Product Name -->
                    <div class="col-md-6 mb-3">
                        <strong class="text-dark">Product Name:</strong>
                        <p class="text-muted font-weight-semibold">{{ $product->product_name }}</p>
                    </div>

                    <!-- Company Name -->
                    <div class="col-md-6 mb-3">
                        <strong class="text-dark">Company:</strong>
                        <p class="text-muted font-weight-semibold">{{ $product->company->name }}</p>
                    </div>
                </div>

                <div class="row mb-5">
                    <!-- Product Description -->
                    <div class="col-md-12">
                        <strong class="text-dark">Description:</strong>
                        <p class="text-muted font-weight-light">{{ $product->product_description }}</p>
                    </div>
                </div>

                <!-- Action Button -->
                <a href="{{ route('insurance_products.index') }}" class="btn btn-outline-primary btn-lg mt-4">Back to Products List</a>
            </div>
        </div>
    </div>
@endsection
