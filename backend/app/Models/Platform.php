<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Platform extends Model
{
    /**
     * Get all related reviews
     */
    public function platforms()
    {
        return $this->hasMany(Review::class);
    }
    public function videogame()
    {
        return $this->hasMany(Videogame::class);
    }
}
