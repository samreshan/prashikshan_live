@extends('layouts.admin')

@section('main-content')
    <div class="container-fluid">
        <!-- Page Heading -->
        <h1 class="h3 mb-4 text-gray-800">Edit Insurance Product</h1>

        <div class="card shadow mb-4">
            <div class="card-body">
                <form action="{{ route('insurance_products.update', ['insurance_product' => $insuranceProduct->id]) }}" method="POST">
                    @csrf
                    @method('PUT')

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Company:</label>
                                <select name="company_id" class="form-control" required>
                                    @foreach ($companies as $company)
                                        <option value="{{ $company->id }}" {{ $insuranceProduct->company_id == $company->id ? 'selected' : '' }}>
                                            {{ $company->name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Product Name:</label>
                                <input type="text" name="product_name" class="form-control" value="{{ $insuranceProduct->product_name }}" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Product Description:</label>
                                <textarea name="product_description" id="summernote" class="form-control" rows="4">{{ $insuranceProduct->product_description }}</textarea>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Update</button>
                    <a href="{{ route('insurance_products.index') }}" class="btn btn-secondary">Back</a>
                </form>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        $(document).ready(function() {
            console.log("Summernote is being initialized");

            $('#summernote').summernote({
                height: 300,
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'italic', 'underline', 'clear']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture', 'video']],
                    ['view', ['fullscreen', 'codeview']],
                ]
            });

            console.log("Summernote initialized");
        });
    </script>
@endsection
