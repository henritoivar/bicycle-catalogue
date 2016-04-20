<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BicyclePart extends Model
{
    protected $fillable = ['name', 'weight', 'price'];
}
