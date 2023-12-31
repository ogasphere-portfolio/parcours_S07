<?php

namespace App\Http\Controllers;

use App\Models\Videogame;
use Illuminate\Http\Request;

class VideogameController extends Controller
{

    /**
     * create
     *
     * @param  mixed $request
     * @return void
     */
    public function create(Request $request){

        $this->validate($request, [
            'name' => 'required',
            'editor' => 'required',
        ]);

        $videoGames = Videogame::create($request->all());

       if ($videoGames->save()) {
        return $this->sendJsonResponse($videoGames, 200);
       }

    }

    /**
     * list
     * GET
     *
     */
    public function list() {
        // Get all items
        $list = Videogame::all();

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
    /**
     * /videogames/[id]
     * GET
     */
    public function read($id) {
        // Get item or send 404 response if not
        $item = Videogame::find($id);

        // Si on a un résultat
        if (!empty($item)) {
            // Return JSON of this list
            return $this->sendJsonResponse($item, 200);
        }
        // Sinon
        else {
            // HTTP status code 404 Not Found
            return $this->sendEmptyResponse(404);
        }
    }

    /**
     * /videogames/[id]/reviews
     * GET
     */
    public function getReviews($id) {
        // Get item or send 404 response if not
        $item = Videogame::find($id);

        // Si on a un résultat
        if (!empty($item)) {
            // Retrieve all related Reviews (thanks to Relationships)
            // $reviews = $item->reviews->load(['videogame', 'platform']);
            // But, relationships with videogame & plaftorm are not configured yet
            $reviews = $item->reviews->load('platform')->load('videogame');

            // Return JSON of this list
            return $this->sendJsonResponse($reviews, 200);
        }
        // Sinon
        else {
            // HTTP status code 404 Not Found
            return $this->sendEmptyResponse(404);
        }
    }
}
