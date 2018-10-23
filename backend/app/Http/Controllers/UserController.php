<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function signUp(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required | email | unique:users',
            'password' => 'required'
        ]);

        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password'))
        ]);

        $user->save();
        return response()->json([
            'message' => 'User created'
        ], 201);
    }

    public function logOut(Request $request)
    {   
        // DB::table('oauth_refresh_tokens')
        // ->where('access_token_id', $request->input('token'))
        // ->update([
        //     'revoked' => true
        // ]);
        // return response();
        $user = $request->user()->token()->revoke();
        $response = [
            'user'=>$user
        ];
        return response()->json($response);

        
    }
}
