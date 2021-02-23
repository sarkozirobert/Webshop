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

  constructor(public activeModal: NgbActiveModal, private cartService: CartService) {
    this.productsInCart = [];
  }

  ngOnInit(): void {
    this.productsInCart = this.cartService.items;
    console.log(this.productsInCart);
    console.log(this.productsInCart.length);
  }
  submit(): void {
    // this.cartService.addToCart(this.productsInCart);
    this.activeModal.close();
    }
  }
