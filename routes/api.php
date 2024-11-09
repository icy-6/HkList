<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\InstallController;
use Illuminate\Support\Facades\Route;

Route::post("/install", [InstallController::class, "install"]);

Route::middleware(["IsInstall"])->group(function () {
    Route::prefix("/parse")->middleware(["IdentifierFilter"])->group(function () {

    });

    Route::prefix("/admin")->middleware(["PassFilter"])->group(function () {
        Route::prefix("/account")->group(function () {
            Route::get("/", [AccountController::class, "select"]);
            Route::post("/", [AccountController::class, "insert"]);
            Route::post("/update", [AccountController::class, "updateInfo"]);
            Route::patch("/", [AccountController::class, "updateData"]);
            Route::delete("/", [AccountController::class, "delete"]);
        });
    });
});
