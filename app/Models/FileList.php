<?php

namespace App\Models;

class FileList extends Model
{
    public static array $attrs = [
        "id",
        "surl",
        "pwd",
        "uk",
        "shareid",
        "randsk",
        "fs_id",
        "size",
        "filename",
        "created_at",
        "updated_at",
    ];

    protected $fillable = [
        "surl",
        "pwd",
        "uk",
        "shareid",
        "randsk",
        "fs_id",
        "size",
        "filename"
    ];
}
