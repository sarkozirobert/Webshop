
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import {OrderedItem} from '../interfaces/ordered-item';

  @Injectable({
  providedIn: 'root'
})
export class CartService {
    product: OrderedItem;
    items: OrderedItem[] | undefined;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.product = {name: '', id: 0, price: 0, size: '', quantity: 0, subTotal: 0};
    this.items = [];
  }

  // tslint:disable-next-line:typedef
  addToCart(product: OrderedItem) {
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


