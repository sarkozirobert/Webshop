import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Product} from '../interfaces/product';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductResponse} from '../interfaces/product-response';
import {environment} from '../../environments/environment';
import {Sizes} from '../interfaces/sizes';
import {SizesResponse} from '../interfaces/sizes-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // @ts-ignore
  private readonly SERVER_URL = environment.SERVER_URL;
  private productSubject: Subject<Product[]>;


  constructor(private  http: HttpClient, private router: Router) {
    this.productSubject = new Subject<Product[]>();
    router.events.subscribe(e => {
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

  getProductSizeAndQuantity(ID: number): Observable<Sizes> {
    return this.http.get<SizesResponse>(this.SERVER_URL + '/stock/' + ID, {withCredentials: true})
      .pipe(map(response => response.list[0]));
  }
  getGenderType(): Observable<Product[]> {
    return this.http.get<ProductResponse>(this.SERVER_URL + '/genders', {withCredentials: true})
      .pipe(map(response => response.list));
  }

}
