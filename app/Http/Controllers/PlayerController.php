<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlayerRequest;
use App\Player;
use \Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PlayerController extends Controller
{
    public function index()
    {
        return response()
            ->json(Player::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param PlayerRequest $request
     * @return JsonResponse
     */
    public function store(PlayerRequest $request)
    {
        $player = Player::create($request->validated());

        return response()->json($player, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param Player $player
     * @return JsonResponse
     */
    public function show(Player $player)
    {
        return response()->json($player);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param PlayerRequest $request
     * @param Player $player
     * @return JsonResponse
     */
    public function update(PlayerRequest $request, Player $player)
    {
        $player->update($request->validated());

        return response()->json($player);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Player $player
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy(Player $player)
    {
        $player->delete();

        return response()->json();
    }
}
