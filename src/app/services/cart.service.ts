import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderedItem} from '../interfaces/ordered-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: OrderedItem[];

  constructor(private http: HttpClient) {
    this.items = [];
  }

  // tslint:disable-next-line:typedef max-line-length
  addToCart(product: { imageId: number; quantity: number; size: string; price: number; subTotal: number; name: string; id: number | undefined }) {
    // @ts-ignore
    this.items.push(product);
    console.log(this.items);
  }

  // tslint:disable-next-line:typedef
  getItems() {
    return this.items;
  }

  // tslint:disable-next-line:typedef
  clearCart() {
    this.items = [];
    return this.items;
  }
}


