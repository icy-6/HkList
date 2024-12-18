<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Account extends Model
{
    use SoftDeletes;

    public static array $attrs = [
        "id",
        "baidu_name",
        "uk",
        "account_type",
        "account_data",
        "switch",
        "reason",
        "prov",
        "created_at",
        "updated_at",
        "deleted_at"
    ];

    protected $fillable = [
        "baidu_name",
        "uk",
        "account_type",
        "account_data",
        "switch",
        "reason",
        "prov"
    ];

    protected function casts(): array
    {
        return [
            "account_data" => "json",
            "switch" => "boolean"
        ];
    }

    public function records()
    {
        return $this->hasMany(Record::class);
    }
}
