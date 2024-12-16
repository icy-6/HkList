<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    public static array $attrs = [
        "id",
        "token",
        "count",
        "size",
        "day",
        "can_use_ip_count",
        "ip",
        "switch",
        "reason",
        "expires_at",
        "created_at",
        "updated_at",
    ];

    protected $fillable = [
        "token",
        "count",
        "size",
        "day",
        "can_use_ip_count",
        "ip",
        "switch",
        "reason",
        "expires_at"
    ];

    protected function casts(): array
    {
        return [
            "ip" => "json",
            "expires_at" => "datetime",
            "switch" => "boolean"
        ];
    }

    public function records()
    {
        return $this->hasMany(Record::class);
    }
}
