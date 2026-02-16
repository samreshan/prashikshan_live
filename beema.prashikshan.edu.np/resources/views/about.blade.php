@extends('layouts.admin')

@section('main-content')
    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">{{ __('About') }}</h1>

    <div class="row justify-content-center">

        <div class="col-lg-9">

            <div class="card shadow mb-4">

                <div class="card-profile-image mt-4">
                    <img src="{{ asset('img/favicon.png') }}" class="rounded-circle" alt="user-image">
                </div>

                <div class="card-body">

                    <div class="row">
                        <div class="col-lg-12">
                            <h5 class="font-weight-bold">Laravel SB Admin 2 Integration</h5>
                            <p>Integrating the SB Admin 2 template into a Laravel project involves several steps, including downloading the template, setting up your Laravel project, and then integrating the template files into your project.</p>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="col-lg-12">
                            <h5 class="font-weight-bold">Credits</h5>
                            <p>Laravel SB Admin 2 uses some open-source third-party libraries/packages, many thanks to the web community.</p>
                            <ul>
                                <li><a href="https://laravel.com" target="_blank">Laravel</a> - Open source framework.</li>
                                <li><a href="https://github.com/DevMarketer/LaravelEasyNav" target="_blank">LaravelEasyNav</a> - Making managing navigation in Laravel easy.</li>
                                <li><a href="https://startbootstrap.com/themes/sb-admin-2" target="_blank">SB Admin 2</a> - Thanks to Start Bootstrap.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    </div>

@endsection
