<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileList extends Model
{
    protected $fillable = [
        "surl",
        "pwd",
        "fs_id",
        "filename"
    ];
}
