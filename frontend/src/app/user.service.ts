import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private HEADERS = new Headers({ 'Content-Type': 'application/json' });
  private BACKURL = 'http://todo.test/';
  constructor(private http: Http) {

  }

  createUser(name: string, email: string, password: string) {
    let body = JSON.stringify({
      name: name,
      email: email,
      password: password
    });
    return this.http.post(this.BACKURL + 'api/register', body, { headers: this.HEADERS });
  }

  login(email: string, password: string): Subject<any> {
    let body = JSON.stringify({
      grant_type: "password",
      client_id: 2,
      client_secret: "svyS4amFMXueo9Kffcar7VDxOZxSNHXMZoodYWjF",
      username: email,
      password: password
    });
    var result: Subject<any> = new Subject<any>();
    this.http.post(this.BACKURL + 'oauth/token', body, { headers: this.HEADERS }).subscribe((response: Response) => {
      localStorage.setItem('access_token', "Bearer " + response.json().access_token);
      result.next(true)
    },(
      (err: Error) => {
        result.next(false);
      }
    ));
       return result
  }
  getToken(): any {
    return localStorage.getItem('access_token');
  }
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  logout() {

    var HEADERS = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.getToken() })
    this.http.delete(this.BACKURL + 'api/logout', { headers: HEADERS }).subscribe((response: any) => {
    });
    localStorage.removeItem('access_token');

  }
}
