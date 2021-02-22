import {Component, Input, OnInit, Output} from '@angular/core';
import {User} from '../../interfaces/user';
import {Product} from '../../interfaces/product';
import {Sizes} from '../../interfaces/sizes';
import {OrderedItem} from '../../interfaces/ordered-item';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.css']
})
export class ProductRowComponent implements OnInit {

  @Input()
  orderedProduct: OrderedItem;


  constructor( private cartService: CartService) {
    this.orderedProduct = {id: 0, name: '', imageId: 0, price: 0, size: '', quantity: 0, subTotal: 0 };
  }

  ngOnInit(): void {
  }

}
