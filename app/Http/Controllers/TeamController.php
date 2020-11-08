<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeamRequest;
use App\Team;
use \Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;

class TeamController extends Controller
{
    public function index()
    {
        return Team::query()
            ->with(['players'])
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param TeamRequest $request
     * @return JsonResponse
     */
    public function store(TeamRequest $request)
    {
        $team = Team::create(Arr::except($request->validated(),"players"));
        $team->players()->sync((array) $request->get("players"));

        return response()->json($team, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param Team $team
     * @return JsonResponse
     */
    public function show(Team $team)
    {
        return response()->json($team);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param TeamRequest $request
     * @param Team $team
     * @return JsonResponse
     */
    public function update(TeamRequest $request, Team $team)
    {
        $team->update(Arr::except($request->validated(),"players"));
        $team->players()->sync((array) $request->get("players"));

        return response()->json($team);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Team $team
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy(Team $team)
    {
        $team->delete();

        return response()->json();
    }
}
