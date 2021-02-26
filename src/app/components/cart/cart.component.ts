import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderedItem} from '../../interfaces/ordered-item';
import {CartService} from '../../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productsInCart: OrderedItem[];

  constructor(public activeModal: NgbActiveModal, public cartService: CartService) {
    this.productsInCart = [];
  }

  ngOnInit(): void {
    // @ts-ignore
    this.productsInCart = this.cartService.items;
    console.log(this.productsInCart);
    console.log(this.productsInCart.length);
  }
  submit(): void {
    // this.cartService.addToCart(this.productsInCart);
    this.activeModal.close();
    }


  deleteRow(id: number): void{
    for (let i = 0; i < this.productsInCart.length; ++i){
      if (this.productsInCart[i].id === id) {
        this.productsInCart.splice(i, 1);
      }
    }
  }
  }
