<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

    /**
     * The attributes that load relations
     * @var array
     */
    protected $with = [
        'players',
    ];

    /**
     * save with created_at and updated_at
     * @var bool
     */
    public $timestamps = true;
    /**
     * The players that related  to Team.
     */
    public function players()
    {
        return $this->belongsToMany(Player::class);
    }
}
