import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserResponse} from '../interfaces/user-response';
import {environment} from '../../environments/environment';
import {UserProfile} from '../interfaces/userProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly SERVER_URL = environment.SERVER_URL;
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
  addUser(s: User): Observable<User>{
    return this.http.post<User>( this.SERVER_URL  + '/register',  s,
      {withCredentials: true });
    return this.http.post<User>( this.SERVER_URL  + '/register',  s, {withCredentials: true });
  }

  modifyUser(s: UserProfile): Observable<UserResponse>{
    return this.http.put<UserResponse>(
      this.SERVER_URL + '/user',
      {user: s},
      {withCredentials: true}
    );
  }

}
