import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../interfaces/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  filter: string;
  // refreshSubsrciption: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
  ) {
    this.products = [];
    this.filter = '';
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      s => {
        this.products = s;
      });
    this.productService.getGenderType().subscribe(
      s => {
        console.log(s);
      });
  }

  genderFilter(): void {

  }
}
