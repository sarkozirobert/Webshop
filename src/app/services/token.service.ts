import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {Token} from '../interfaces/token';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {TokenResponse} from '../interfaces/token-response';



@Injectable({
  providedIn: 'root'
})
export class TokenService {
  // @ts-ignore
  private readonly SERVER_URL = environment.SERVER_URL;
  private tokenSubject: Subject<Token>;

  constructor(private  http: HttpClient, private router: Router) {
    this.tokenSubject = new Subject<Token>();
    router.events.subscribe(e => {
      console.log(e);
    });
  }
  getToken(): Observable<Token> {
    return this.http.get<TokenResponse>(this.SERVER_URL + '/csrf', {withCredentials: true})
      .pipe(map(resp => resp.list[0]));
  }

}
