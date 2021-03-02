import {Component, Input, OnInit} from '@angular/core';
import {PurchasedClothesList} from '../../interfaces/purchasedClothesList';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  @Input()
  productsInCart: PurchasedClothesList[];
  totalPrice: number;

  constructor(private cartService: CartService) {
    this.productsInCart = [];
    this.totalPrice = 0;
  }


  ngOnInit(): void {
    this.productsInCart = this.cartService.items;
    this.sumPrice(this.productsInCart);
    // console.log(this.productsInCart);
  }

  // @ts-ignore
  sumPrice(productsInCart: PurchasedClothesList[]): number {
    this.totalPrice = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < productsInCart.length; i++) {
      this.totalPrice = productsInCart[i].subTotal + this.totalPrice;
      /*console.log(this.productsInCart[i].subTotal);
      console.log(this.totalPrice);
      console.log(i);*/
    }
    this.totalPrice.toFixed(2);
    return this.totalPrice;
  }

}
