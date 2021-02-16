import { Component, OnInit } from '@angular/core';
import {Product} from '../../interfaces/product';
import {Subscription} from 'rxjs';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  // refreshSubsrciption: Subscription;

  constructor(private productService: ProductsService) {
    this.products = [];
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      s => {
        console.log(s);
      });
  }

}
