<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bicycle extends Model
{
    protected $fillable = ['name', 'brand'];

    public function bicycleParts()
    {
        return $this->hasMany(BicyclePart::class);
    }
}
