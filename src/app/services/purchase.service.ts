import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PurchasePackToSend} from '../interfaces/purchase-pack-to-send';
import {Observable} from 'rxjs';
import {PurchasePackToSendResponse} from '../interfaces/purchase-pack-to-send-response';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private readonly SERVER_URL = environment.SERVER_URL;

  constructor(private  http: HttpClient) { }

  sendPurchase(purchasePack: PurchasePackToSend): Observable<PurchasePackToSendResponse>{
    return this.http.post<PurchasePackToSendResponse>(
      this.SERVER_URL + '/orders',
      {order: purchasePack},
      {withCredentials: true}
    );
  }
}
