<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    public static array $attrs = [
        "id",
        "baidu_name",
        "uk",
        "account_type",
        "account_data",
        "switch",
        "reason",
        "prov",
        "used_at"
    ];

    protected $fillable = [
        "baidu_name",
        "uk",
        "account_type",
        "account_data",
        "switch",
        "reason",
        "prov",
        "used_at"
    ];
}
