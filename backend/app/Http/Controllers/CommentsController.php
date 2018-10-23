<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Post;
class CommentsController extends Controller
{
    public function index(Post $post){
        $comments = $post->comments()->get();
        $response = [
            'comments'=>$comments
        ];
        return response()->json($response);
    }

    public function destroy(Comment $comment){
        $comment->delete();
        return response('Comment deleted.')->header('Content-Type', 'text/plain');
    }

    public function create(Request $request, Post $post){
        $comment = new Comment();
        $comment->user_id = 1;
        $comment->post_id = $post->id;
        $comment->ip_address = '255.255.255.255';
        $comment->body = $request->input('body');
        $post->comment_count++;
        $comment->save();
        $post->save();
        $response = [
            'comment'=>$comment
        ];
        return response()->json($response);
    }
    public function update(Request $request ,Comment $comment){
        $old_comment = clone $comment;
        $comment->body = $request->input('body');
        $comment->save();
        $response = [
            'old_comment'=>$old_comment,
            'new_comment'=>$comment
        ];
        return response()->json($response);
    }
}
