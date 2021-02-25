import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Signin} from '../interfaces/signin';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Token} from '../interfaces/token';
import {LoginedUser} from '../interfaces/logined-user';
import {SigninResponse} from '../interfaces/signin-response';



@Injectable({
  providedIn: 'root'
})
export class SigninService {
  // @ts-ignore
  private readonly SERVER_URL = environment.SERVER_URL + '/login';
  private signinSubject: Subject<LoginedUser[]>;

  constructor(private  http: HttpClient, private router: Router) {
    this.signinSubject = new Subject<LoginedUser[]>();
    router.events.subscribe(e => {
      console.log(e);
    });
  }
  // tslint:disable-next-line:ban-types
  logIn( t: string, s: string, p: string): Observable<SigninResponse>{
    const fd = new FormData();
    fd.append('username', s);
    fd.append('password', p);
    const newHeaders = new  HttpHeaders({'X-CSRF-TOKEN': t});
    // tslint:disable-next-line:ban-types
    return this.http.post<SigninResponse>( this.SERVER_URL, fd, { headers: newHeaders, withCredentials: true });
  }
}
