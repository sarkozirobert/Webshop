import {Component, Input, OnInit, Output} from '@angular/core';
import {User} from '../../interfaces/user';
import {Product} from '../../interfaces/product';
import {Sizes} from '../../interfaces/sizes';

@Component({
  selector: 'app-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.css']
})
export class ProductRowComponent implements OnInit {

  @Input()
  product: Product;

  constructor() {
    this.product = {name: '', id: 0, details: '', price: 0, color: '', gender: '', type: '', };
  }

  ngOnInit(): void {
  }

}
