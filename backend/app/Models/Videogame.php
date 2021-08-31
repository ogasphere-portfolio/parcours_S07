<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Videogame extends Model
{
    /**
     * Get all related reviews
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function platform()
    {
        return $this->hasMany(Platform::class);
    }
}
