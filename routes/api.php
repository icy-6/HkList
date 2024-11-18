<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\BlackListController;
use App\Http\Controllers\CheckPasswordController;
use App\Http\Controllers\Config\GeneralController;
use App\Http\Controllers\Config\LimitController;
use App\Http\Controllers\Config\MailController;
use App\Http\Controllers\Config\ParseController;
use App\Http\Controllers\InstallController;
use App\Http\Controllers\ParserController;
use App\Http\Controllers\TokenController;
use Illuminate\Support\Facades\Route;

Route::prefix("/v1")->group(function () {
    Route::post("/install", [InstallController::class, "install"]);

    Route::middleware(["IsInstall"])->group(function () {
        Route::prefix("/parse")->middleware(["IdentifierFilter"])->group(function () {
            Route::get("/config", [ParserController::class, "getConfig"]);
            Route::get("/limit", [ParserController::class, "getLimit"]);
            Route::middleware(["PassFilter:USER"])->group(function () {
                Route::post("/get_file_list", [ParserController::class, "getFileList"]);
                Route::post("/get_vcode", [ParserController::class, "getVcode"]);
                Route::post("/get_download_links", [ParserController::class, "getDownloadLinks"]);
            });
        });

        Route::post("/admin/check_password", [CheckPasswordController::class, "checkPassword"]);
        Route::prefix("/admin")->middleware(["PassFilter:ADMIN"])->group(function () {
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

            Route::prefix("/config")->group(function () {
                Route::prefix("/general")->group(function () {
                    Route::get("/", [GeneralController::class, "getConfig"]);
                    Route::patch("/", [GeneralController::class, "updateConfig"]);
                });
                Route::prefix("/limit")->group(function () {
                    Route::get("/", [LimitController::class, "getConfig"]);
                    Route::patch("/", [LimitController::class, "updateConfig"]);
                });
                Route::prefix("/parse")->group(function () {
                    Route::get("/", [ParseController::class, "getConfig"]);
                    Route::patch("/", [ParseController::class, "updateConfig"]);
                    Route::post("/test_auth", [ParseController::class, "testAuth"]);
                });
                Route::prefix("/mail")->group(function () {
                    Route::get("/", [MailController::class, "getConfig"]);
                    Route::patch("/", [MailController::class, "updateConfig"]);
                    Route::post("/send_test_mail", [MailController::class, "sendTestMail"]);
                });
            });
        });
    });
});
