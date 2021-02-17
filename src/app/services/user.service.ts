import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserResponse} from '../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly SERVER_URL = 'https://....';
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
  addStudent(s: User): Observable<UserResponse>{
    return this.http.post<UserResponse>( this.SERVER_URL, {user: s},
      {withCredentials: true });
  }

}
