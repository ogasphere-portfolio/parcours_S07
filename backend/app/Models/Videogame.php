<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Videogame extends Model
{

    protected $fillable = ['id','name','editor'];
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
