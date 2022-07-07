<?php

use App\Events\WebsocketDemoEvent;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use App\Http\Controllers\MessageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/app', function () {
    return view('app');
});

Route::get('/reset-password/{token}', function ($token) {
    return view('auth.password-reset', [
        'token' => $token
    ]);
})->middleware(['guest:' . config('fortify.guard')])
    ->name('password.reset');

Route::get('/shared/posts/{post}', function (Request $request, Post $post) {

    return "Specially made just for you ;) Post id: {$post->id}";
})->name('shared.post')->middleware('signed');



// Route::get('/socket/update-post', UpdatePostSocketHandler::class);





Route::get('playground',function(){
event(new \App\Events\ChatMessageEvent());
return null;
});



Route::get('ws',function(){
    return view('websocket');
});


Route::post('chat-message',function(Request $request){
    event(new \App\Events\ChatMessageEvent($request->message,auth()->user()));
    return null;
});

// Route::post('login',[MessageController::class,'login']);
// Route::post('logout',[MessageController::class, 'logout']);

