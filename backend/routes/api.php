<?php

use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Users
Route::post('/register', 'UserController@signUp');
Route::delete('/logout', 'UserController@logOut')->middleware('auth:api');

//Todos
Route::get('/todo', 'TodoController@index')->middleware('auth:api');
Route::post('/todo', 'TodoController@store')->middleware('auth:api');
Route::delete('/todo/{toDo}', 'TodoController@destroy')->middleware('auth:api');
Route::post('/todo/{toDo}', 'TodoController@updateState')->middleware('auth:api');//patch
Route::post('/todos', 'TodoController@updatePositions')->middleware('auth:api');//put


//Posts
Route::get('/posts', 'PostsController@index');
Route::get('/posts/{post}', 'PostsController@show');
Route::post('/posts', 'PostsController@create')->middleware('auth:api');
//Route::delete('/posts/{post}', 'PostsController@destroy');
//Route::patch('/posts/{post}', 'PostsController@update');

//comments
Route::get('/posts/{post}/comments', 'CommentsController@index');
Route::post('/posts/{post}/comments', 'CommentsController@create')->middleware('auth:api');
//Route::delete('/posts/comments/{comment}', 'CommentsController@destroy');
//Route::patch('/posts/comments/{comment}', 'CommentsController@update');

