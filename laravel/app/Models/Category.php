<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'display_order',
    ];


    public function menus()
    {
        return $this->hasMany(Menu::class);
    }
}
