import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {UserProfile} from '../interfaces/userProfile';
import {map} from 'rxjs/operators';
import {UsersResponse} from '../interfaces/users-response';
import {UserResponse} from '../interfaces/user-response';
import {OrderResponse} from '../interfaces/order-response';
import {Order} from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // @ts-ignore
  private readonly SERVER_URL = environment.SERVER_URL;
  private userSubject: Subject<User[]>;


  constructor(private  http: HttpClient, private router: Router) {
    this.userSubject = new Subject<User[]>();
    router.events.subscribe(e => {
      console.log(e);
    });
  }
  deleteUser(s: User): Observable<UsersResponse>{

    return this.http.delete<UsersResponse>(this.SERVER_URL + '?id=' + s.id,
      {withCredentials: true});

  }
  addUser(t: string, s: User): Observable<User>{
    const newHeaders = new  HttpHeaders({'X-CSRF-TOKEN': t});
    return this.http.post<User>( this.SERVER_URL,  s, { headers: newHeaders, withCredentials: true });
  }
  getUserData(): Observable<User>{
    return this.http.get<UserResponse>(this.SERVER_URL + '/user', {withCredentials: true}).pipe(map(resp => resp.user));
  }

  modifyUser(s: UserProfile): Observable<UsersResponse>{
    return this.http.put<UsersResponse>(
      this.SERVER_URL + '/user',
      {user: s},
      {withCredentials: true}
    );
  }

  getOrderData(id: number): Observable<Order[]>{
    return this.http.get<OrderResponse>(this.SERVER_URL + '/user/order/' + '?id=' + id, {withCredentials: true})
      .pipe(map( resp => resp.orders ));
  }
}
