<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function () {

});

Route::group(['middleware' => 'auth:sanctum'], function () {
    // auth user data
    Route::get("/user", function (Request $request){
        return $request->user();
    });

    Route::group(['prefix' => 'teams'], function () {
        Route::get('/', 'TeamController@index');
        Route::post('/', 'TeamController@store');
        Route::get('/{team}', 'TeamController@show');
        Route::put('/{team}', 'TeamController@update');
        Route::delete('/{team}', 'TeamController@destroy');
    });

    Route::group(['prefix' => 'players'], function () {
        Route::get('/', 'PlayerController@index');
        Route::post('/', 'PlayerController@store');
        Route::get('/{player}', 'PlayerController@show');
        Route::put('/{player}', 'PlayerController@update');
        Route::delete('/{player}', 'PlayerController@destroy');
    });
});


