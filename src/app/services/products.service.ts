import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Product} from '../interfaces/product';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductResponse} from '../interfaces/product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly SERVER_URL = 'http://192.168.1.131:8080/clothes';
  private productSubject: Subject<Product[]>;


  constructor(private  http: HttpClient, private router: Router) {
    this.productSubject = new Subject<Product[]>();
    router.events.subscribe( e => {
      console.log(e);
    });
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<ProductResponse>(this.SERVER_URL, {withCredentials: true})
      .pipe(map(resp => resp.products));
  }
}
