import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private readonly SERVER_URL = environment.SERVER_URL + '/logout';
  constructor(private  http: HttpClient, private router: Router) {
    router.events.subscribe(e => {
      console.log(e);
    });
  }
  // tslint:disable-next-line:ban-types
  logout( t: string): Observable<Object>{
    const newHeaders = new  HttpHeaders({'X-CSRF-TOKEN': t});
    // tslint:disable-next-line:ban-types
    return this.http.post<Object>( this.SERVER_URL, '', { headers: newHeaders, withCredentials: true });
  }
}
