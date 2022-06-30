<?php

use App\Events\playgroundEvent;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Broadcast::channel('playground.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
//     // return $user->id===playgroundEvent::find($id)->user_id;
// });
Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('private.chat.{id}', function ($user, $id) {
    return true;
});
