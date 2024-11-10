<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlackList extends Model
{
    public static array $attrs = [
        "id",
        "type",
        "identifier",
        "reason",
        "expires_at"
    ];

    protected $fillable = [
        "type",
        "identifier",
        "reason",
        "expires_at"
    ];
}
