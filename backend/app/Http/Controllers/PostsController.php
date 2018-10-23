<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
class PostsController extends Controller
{
    public function index(){
        $posts = Post::get();
        $response = [
            'posts'=>$posts
        ];
        return response()->json($response, 200);
    }

    public function show(Post $post){
        $response = [
            'post'=>$post
        ];
        return response()->json($response, 200);
    }
    public function destroy(Post $post){
        $post->delete();
        return response('Post deleted.')->header('Content-Type', 'text/plain');
    }

    public function create(Request $request){
        $post = new Post();

        $post->user_id = $request->user()->id;
        $post->title = $request->input('title');
        $post->body = $request->input('body');
        $post->comment_count = 0;
        $post->save();
        $response = [
            'post'=>$post
        ];
        return response()->json($response);
    }
    public function update(Request $request ,Post $post){
        $old_post = clone $post;
        $post->title = $request->input('title');
        $post->body = $request->input('body');
        $post->save();
        $response = [
            'old_post'=>$old_post,
            'new_post'=>$post
        ];
        return response()->json($response);
    }
}
