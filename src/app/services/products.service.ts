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
  private readonly SERVER_URL = 'https://webshopbackend.herokuapp.com';
  private productSubject: Subject<Product[]>;


  constructor(private  http: HttpClient, private router: Router) {
    this.productSubject = new Subject<Product[]>();
    router.events.subscribe( e => {
      console.log(e);
    });
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<ProductResponse>(this.SERVER_URL + '/clothes', {withCredentials: true})
      .pipe(map(resp => resp.list));
  }

  getProductByID(ID: number): Observable<Product> {
    return this.http.get<ProductResponse>(this.SERVER_URL + '/clothes/' + ID, {withCredentials: true})
      .pipe(map(response => response.list[0]));
  }
}
