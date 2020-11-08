<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
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
     * The attributes that will show accessors for arrays.
     *
     * @var array
     */
    protected $appends = ['full_name'];

    /**
     * save with created_at and updated_at
     * @var bool
     */
    public $timestamps = true;
    /**
     * accessor to get full name of player
     *
     * @return string
     */
    public function getFullNameAttribute() {
        return ucfirst($this->first_name) . ' ' . ucfirst($this->last_name);
    }
}
