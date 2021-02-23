import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserResponse} from '../interfaces/user-response';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // @ts-ignore
  private readonly SERVER_URL = environment.SERVER_URL + '/register';
  private userSubject: Subject<User[]>;


  constructor(private  http: HttpClient, private router: Router) {
    this.userSubject = new Subject<User[]>();
    router.events.subscribe(e => {
      console.log(e);
    });
  }
  deleteUser(s: User): Observable<UserResponse>{

    return this.http.delete<UserResponse>(this.SERVER_URL + '?id=' + s.id,
      {withCredentials: true});

  }
  addUser(t: string, s: User): Observable<User>{
    const newHeaders = new  HttpHeaders({'X-CSRF-TOKEN': t});
    return this.http.post<User>( this.SERVER_URL,  s, { headers: newHeaders, withCredentials: true });
  }

}
