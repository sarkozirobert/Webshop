import {Component, Input, OnInit, Output} from '@angular/core';
import {User} from '../../interfaces/user';
import {Product} from '../../interfaces/product';
import {Sizes} from '../../interfaces/sizes';
import {PurchasedClothesList} from '../../interfaces/purchasedClothesList';
import {CartService} from '../../services/cart.service';
// @ts-ignore
import EventEmitter = require('events');

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tr[app-product-row]',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.css']
})
export class ProductRowComponent implements OnInit {

  @Input()
  orderedProduct: PurchasedClothesList;


  constructor( public cartService: CartService) {
    this.orderedProduct = {id: 0, name: '', imageId: 0, price: 0, size: '', quantity: 0, subTotal: 0 };
  }

  ngOnInit(): void {
  }

}
