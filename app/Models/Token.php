<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    protected $fillable = [
        "token",
        "count",
        "size",
        "day",
        "ip",
        "expires_at"
    ];
}
