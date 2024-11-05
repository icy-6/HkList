<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/", [\App\Http\Controllers\BlackListController::class, "update"]);
