import {Component, Input, OnInit} from '@angular/core';
import {PurchasePackToSend} from '../../interfaces/purchase-pack-to-send';
import {OrderedItem} from '../../interfaces/ordered-item';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  @Input()
  productsInCart: OrderedItem[];
  totalPrice: number;

  constructor(private cartService: CartService) {
    this.productsInCart = [];
    this.totalPrice = 0;
  }


  ngOnInit(): void {
    this.productsInCart = this.cartService.items;
    console.log(this.productsInCart);
  }

  // @ts-ignore
  sumPrice(productsInCart: OrderedItem[]): number {
    this.totalPrice = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.productsInCart.length; i++) {
      this.totalPrice = this.productsInCart[i].subTotal + this.totalPrice;
      /*console.log(this.productsInCart[i].subTotal);
      console.log(this.totalPrice);
      console.log(i);*/
    }
    return this.totalPrice;
  }

}
