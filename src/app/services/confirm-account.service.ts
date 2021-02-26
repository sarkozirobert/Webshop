import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConfirmMessageResponse} from '../interfaces/confirm-message-response';
import {ConfirmMessage} from '../interfaces/confirm-message';
import {Token} from '../interfaces/token';


@Injectable({
  providedIn: 'root'
})
export class ConfirmAccountService {
  messageConfirm: ConfirmMessageResponse;
  private readonly SERVER_URL = environment.SERVER_URL + '/confirm-account';
  private messageSubject: Subject<ConfirmMessage>;
  constructor(private  http: HttpClient, private router: Router) {
    this.messageSubject = new Subject<ConfirmMessage>();
    router.events.subscribe(e => {
      console.log(e);
    });
    this.messageConfirm = {
      success : false,
      // @ts-ignore
      message: {
        // @ts-ignore
        message: ''
      }
    };
  }
  // tslint:disable-next-line:ban-types
  confirm(t: string | null): Observable<ConfirmMessage>{
    // @ts-ignore
    // tslint:disable-next-line:ban-types
    return this.http.get<ConfirmMessageResponse>( this.SERVER_URL + '?token=' + t , { withCredentials: true })
      .pipe(map(resp => resp ));
  }
}
