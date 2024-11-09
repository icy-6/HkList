<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    protected $fillable = [
        "ip",
        "fingerprint",
        "fs_id",
        "url",
        "ua",
        "token_id",
        "account_id"
    ];
}
