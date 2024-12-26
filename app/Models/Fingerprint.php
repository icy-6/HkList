<?php

namespace App\Models;

class Fingerprint extends Model
{
    public static array $attrs = [
        "id",
        "fingerprint",
        "ip",
        "filename",
        "created_at",
        "updated_at",
    ];

    protected $fillable = [
        "fingerprint",
        "ip"
    ];

    protected function casts(): array
    {
        return [
            "ip" => "json"
        ];
    }
}
