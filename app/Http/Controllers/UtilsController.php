<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class UtilsController extends Controller
{
    public static function sendMail($messageText, $subject = "有账户过期了~")
    {
        if (!config("mail.switch")) return;
        try {
            Mail::raw("亲爱的" . config("mail.to.name") . ":\n\t$messageText", function ($message) use ($subject) {
                $message->to(config("mail.to.address"))->subject($subject);
            });
        } catch (Exception $e) {
            // 处理异常
        }
    }
}
