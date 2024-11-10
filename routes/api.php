<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\BlackListController;
use App\Http\Controllers\InstallController;
use App\Http\Controllers\TokenController;
use Illuminate\Support\Facades\Route;

Route::prefix("/v1")->group(function () {
    Route::post("/install", [InstallController::class, "install"]);

    Route::middleware(["IsInstall"])->group(function () {
        Route::prefix("/parse")->middleware(["IdentifierFilter"])->group(function () {

        });

        Route::prefix("/admin")->middleware(["PassFilter"])->group(function () {
            Route::prefix("/account")->group(function () {
                Route::get("/", [AccountController::class, "select"]);
                Route::post("/", [AccountController::class, "insert"]);
                Route::post("/update_info", [AccountController::class, "updateInfo"]);
                Route::patch("/", [AccountController::class, "update"]);
                Route::delete("/", [AccountController::class, "delete"]);
            });

            Route::prefix("/token")->group(function () {
                Route::get("/", [TokenController::class, "select"]);
                Route::post("/", [TokenController::class, "insert"]);
                Route::patch("/", [TokenController::class, "update"]);
                Route::delete("/", [TokenController::class, "delete"]);
            });

            Route::prefix("/black_list")->group(function () {
                Route::get("/", [BlackListController::class, "select"]);
                Route::post("/", [BlackListController::class, "insert"]);
                Route::patch("/", [BlackListController::class, "update"]);
                Route::delete("/", [BlackListController::class, "delete"]);
            });
        });
    });
});
