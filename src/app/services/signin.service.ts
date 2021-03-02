import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Signin} from '../interfaces/signin';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Token} from '../interfaces/token';
import {SignInComponent} from '../components/sign-in/sign-in.component';
import {LoginedUser} from '../interfaces/logined-user';
import {SigninResponse} from '../interfaces/signin-response';
import {ConfirmMessage} from '../interfaces/confirm-message';
import {ConfirmMessageResponse} from '../interfaces/confirm-message-response';


@Injectable({
  providedIn: 'root'
})
export class SigninService {
  // @ts-ignore
  private readonly SERVER_URL = environment.SERVER_URL + '/login';
  private readonly SERVER_URL2 = environment.SERVER_URL + '/forgottenpassword/';
  private readonly SERVER_URL3 = environment.SERVER_URL + '/confirm-password';
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
    const newHeaders = new HttpHeaders({'X-CSRF-TOKEN': t});
    // tslint:disable-next-line:ban-types
    return this.http.post<SigninResponse>( this.SERVER_URL, fd, { headers: newHeaders, withCredentials: true });
  }
  forgottenPassword(t: string, e: string): Observable<ConfirmMessageResponse>{
    const newHeaders = new HttpHeaders({'X-CSRF-TOKEN': t});
    return this.http.post<ConfirmMessageResponse>( this.SERVER_URL2 + e, '' , { headers: newHeaders, withCredentials: true });
  }

  newPassword(t: string, s: Signin, pswT: string | null): Observable<ConfirmMessageResponse>{
    const newHeaders = new HttpHeaders({'X-CSRF-TOKEN': t});
    // tslint:disable-next-line:ban-types
    return this.http.post<ConfirmMessageResponse>( this.SERVER_URL3 + '?token=' + pswT , s,
      { headers: newHeaders, withCredentials: true });
  }
}
