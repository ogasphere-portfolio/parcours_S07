<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    /**
     * Get the related Videogame
     */
    public function videogame()
    {

        return $this->belongsTo(Videogame::class);

    }

    /**
     * Get the related Platform
     */
    public function platform()
    {
        return $this->belongsTo(Platform::class);
    }
}
