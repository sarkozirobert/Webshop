import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {UserProfile} from '../interfaces/userProfile';
import {map} from 'rxjs/operators';
import {UsersResponse} from '../interfaces/users-response';
import {UserResponse} from '../interfaces/user-response';
import {ConfirmMessageResponse} from '../interfaces/confirm-message-response';
import {OrderResponse} from '../interfaces/order-response';
import {Order} from '../interfaces/order';
import {ConfirmMessageResponse} from '../interfaces/confirm-message-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // @ts-ignore
  private readonly SERVER_URL = environment.SERVER_URL;
  private userSubject: Subject<User[]>;
  private modifyUserProfile: Subject<UserProfile>;


  constructor(private  http: HttpClient, private router: Router) {
    this.userSubject = new Subject<User[]>();
    router.events.subscribe(e => {
      console.log(e);
    });
    this.modifyUserProfile = new Subject<UserProfile>();
  }
  deleteUser(s: User): Observable<UsersResponse> {

    return this.http.delete<UsersResponse>(this.SERVER_URL + '?id=' + s.id,
      {withCredentials: true});

  }

  addUser(t: string, s: User): Observable<ConfirmMessageResponse> {
    const newHeaders = new HttpHeaders({'X-CSRF-TOKEN': t});
    return this.http.post<ConfirmMessageResponse>(this.SERVER_URL, s, {headers: newHeaders, withCredentials: true});
  }

  getUserData(): Observable<UserProfile> {
    return this.http.get<UserResponse>(this.SERVER_URL + '/user', {withCredentials: true})
      .pipe(map(resp => resp.t));
  }

  modifyUser(t: string, s: UserProfile): Observable<UserResponse> {
    const newHeaders = new HttpHeaders({'X-CSRF-TOKEN': t});
    return this.http.put<UserResponse>(
      this.SERVER_URL + '/user',
      s,
      {headers: newHeaders, withCredentials: true}
    );
  }

  getOrderData(): Observable<Order[]> {
    return this.http.get<OrderResponse>(this.SERVER_URL + '/user/order', {withCredentials: true})
      .pipe(map(resp => resp.list));
  }

  refreshUser(userProfile: UserProfile): void {
    this.modifyUserProfile.next(userProfile);
  }
}
