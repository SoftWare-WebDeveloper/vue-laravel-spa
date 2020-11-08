<?php

use Illuminate\Database\Seeder;

class TeamTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $playersIds = \App\Player::all()->pluck('id');

        factory(\App\Team::class, 10)->create()->each( function($team) use ($playersIds) {
            $randomPlayersForTeam = $playersIds->random(rand(1, 12))->toArray();
            $team->players()->sync($randomPlayersForTeam);
        });

    }
}
