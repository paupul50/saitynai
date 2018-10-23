<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $toDoList = ToDo::Where('user_id', $request->user()->id)->orderBy('position', 'asc')->get();
        $response = [
            'toDoList' => $toDoList
        ];
        return response()->json($response, 200);
    }

    public function store(Request $request)
    {
        if (Todo::Where('user_id', $request->user()->id)->get()->count() > 9) {
            return;
        }
        $toDo = new Todo();
        $toDo->user_id = $user = $request->user()->id;
        $toDo->position = $request->input('position');
        $toDo->text = $request->input('text');
        $toDo->isDone = 0;
        $toDo->save();
        $response = [
            'toDo' => $toDo
        ];
        return response()->json($response);
    }

    public function updateState(ToDo $toDo, Request $request)
    {
        if ($toDo->user_id == $request->user()->id) {
            $toDo->isDone = $request->input('isDone');
            $toDo->save();
            return response('changes saved')->header('Content-Type', 'text/plain');
        } else {
            return response('changes not saved')->header('Content-Type', 'text/plain');
        }
    }

    public function updatePositions(Request $request)
    {
        //$request->user()->id;
        $count = count($request->input('toDos'));
        for ($i = 0; $i < $count; $i++) {
            ToDo::where('id', $request->input('toDos')[$i]['id'])
                ->update(array('position' => $request->input('toDos')[$i]['position']));
        }
        return response()->json(['lol'=>$count]);
    }

    public function destroy(Request $request, ToDo $toDo)
    {
        if ($request->user()->id == $toDo->user_id) {
            $toDo->delete();
            return response('Deleted')->header('Content-Type', 'text/plain');
        } else {
            return response('Unauthenticated')->header('Content-Type', 'text/plain');
        }
    }
}
