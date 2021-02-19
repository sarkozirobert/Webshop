import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Signin} from '../interfaces/signin';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SigninService {
  private readonly SERVER_URL = environment.SERVER_URL + '/login';
  private signinSubject: Subject<Signin[]>;

  constructor(private  http: HttpClient, private router: Router) {
    this.signinSubject = new Subject<Signin[]>();
    router.events.subscribe(e => {
      console.log(e);
    });
  }
  logIn(s: Signin): Observable<Signin>{
    return this.http.post<Signin>( this.SERVER_URL, s, {withCredentials: true });
  }
}
