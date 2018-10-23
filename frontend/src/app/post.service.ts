import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UserService } from './user.service';

@Injectable()
export class PostService {
  private HEADERS = new Headers({ 'Content-Type': 'application/json' });
  private URL = 'http://todo.test/api/';
  constructor(private http: Http, private userService: UserService) {

   }
   getPosts(){
     return this.http.get(this.URL+'posts');
   }

   getPost(id:number){
    return this.http.get(this.URL+'posts/'+id);
   }
   getPostComments(id: number){
    return this.http.get(this.URL+'posts/'+id+'/comments');
   }


   addPost(title:string,text:string){
    var HEADERS = new Headers({'Content-Type': 'application/json', 'Authorization': this.userService.getToken()})
    let body = JSON.stringify({
      title: title,
      body:text
    });
     return this.http.post(this.URL+'posts', body, { headers: HEADERS });
   }

   addComment(id:number, text:string){
    var HEADERS = new Headers({'Content-Type': 'application/json', 'Authorization': this.userService.getToken()})
    let body = JSON.stringify({
      body:text
    });
     return this.http.post(this.URL+'posts/'+id+'/comments', body, { headers: HEADERS });
   }

}
