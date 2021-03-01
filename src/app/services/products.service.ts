import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Product} from '../interfaces/product';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductResponse} from '../interfaces/product-response';
import {environment} from '../../environments/environment';
import {Sizes} from '../interfaces/sizes';
import {SizesResponse} from '../interfaces/sizes-response';
import {Category} from '../interfaces/category';
import {CategoryResponse} from '../interfaces/category-response';
import {ProductFilter} from '../interfaces/product-filter';
import {ClothesType} from '../interfaces/clothes-type';
import {ClothesTypeResponse} from '../interfaces/clothes-type-response';
import {Color} from '../interfaces/color';
import {ColorResponse} from '../interfaces/color-response';

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

  getGenderType(): Observable<Category[]> {
    return this.http.get<CategoryResponse>(this.SERVER_URL + '/genders', {withCredentials: true})
      .pipe(map(response => response.list));
  }

  getColorType(): Observable<Color[]> {
    return this.http.get<ColorResponse>(this.SERVER_URL + '/colors', {withCredentials: true})
      .pipe(map(response => response.list));
  }

  getClothesType(): Observable<ClothesType[]> {
    return this.http.get<ClothesTypeResponse>(this.SERVER_URL + '/types', {withCredentials: true})
      .pipe(map(response => response.list));
  }

  getRequestFilter(t: string, productFilter: ProductFilter): Observable<Product[]>{
    const newHeaders = new HttpHeaders({'X-CSRF-TOKEN': t});
    const filter = {
        name: productFilter.name,
        gender: productFilter.gender,
        type: productFilter.type,
        color: productFilter.color,
        priceMin: productFilter.priceMin,
        priceMax: productFilter.priceMax,
      };
    return this.http.post<ProductResponse>(this.SERVER_URL + '/clothes/filter', filter,
       {headers: newHeaders, withCredentials: true})
      .pipe(map(response => response.list));
  }
}
