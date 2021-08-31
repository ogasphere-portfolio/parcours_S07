<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * /reviews
     * GET
     */
    public function list() {
        // Get all items
        $list = Review::all();

        if (!empty($list)) {
            // Return JSON of this list
            return $this->sendJsonResponse($list, 200);
        }
        // Sinon
        else {
            // HTTP status code 404 Not Found
            return $this->sendEmptyResponse(404);
        }
    }
}
