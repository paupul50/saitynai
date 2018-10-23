import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ToDo } from './to-do/ToDo.model';
import { UserService } from './user.service';
@Injectable()
export class ToDoService {
  private BACKURL: string = 'http://todo.test/api/';
  constructor(private http: Http, private userService:UserService) { }

  getToDoList() {
    var HEADERS = new Headers({'Content-Type': 'application/json', 'Authorization': this.userService.getToken()})
    return this.http.get(this.BACKURL + 'todo', { headers:  HEADERS});
  }

  storeToDo(text: string, position: number) {
    var HEADERS = new Headers({'Content-Type': 'application/json', 'Authorization': this.userService.getToken()})
    let body = JSON.stringify({
      text: text,
      position: position,
    });
    var HEADERS = new Headers({'Content-Type': 'application/json', 'Authorization': this.userService.getToken()})
    return this.http.post(this.BACKURL + 'todo', body, { headers: HEADERS });

  }
  deleteToDo(id: number) {
    var HEADERS = new Headers({'Content-Type': 'application/json', 'Authorization': this.userService.getToken()})
    return this.http.delete(this.BACKURL + 'todo/' + id,{ headers: HEADERS });
  }

  updateTodo(id: number, isDone: number) {
    var HEADERS = new Headers({'Content-Type': 'application/json', 'Authorization': this.userService.getToken()})
    let body = JSON.stringify({
      isDone: isDone,
    });
    return this.http.post(this.BACKURL + 'todo/' + id, body, { headers: HEADERS });
  }
  updateTodoPositions(todos: ToDo[]) {
    var HEADERS = new Headers({'Content-Type': 'application/json', 'Authorization': this.userService.getToken()})
    let body = JSON.stringify({
      toDos: todos,
    });
    this.http.post(this.BACKURL + 'todos', body, { headers: HEADERS }).subscribe((response: any)=>{
    });
  }
}
