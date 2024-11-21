<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileList extends Model
{
    public static array $attrs = [
        "id",
        "surl",
        "pwd",
        "fs_id",
        "size",
        "filename",
        "created_at",
        "updated_at",
    ];

    protected $fillable = [
        "surl",
        "pwd",
        "fs_id",
        "size",
        "filename"
    ];
}
