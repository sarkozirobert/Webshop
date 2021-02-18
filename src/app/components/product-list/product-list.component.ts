import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
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
  saveID: number;
  private product: Product;
  // refreshSubsrciption: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
  ) {
    this.products = [];
    this.product = {
      id: 0,
      name: '',
      details: '',
      price: 0,
      color: '',
      gender: '',
      type: '',
      size: {
        sizeS: 0,
        sizeM: 0,
        sizeL: 0,
        sizeXl: 0
      }
    };
    // tslint:disable-next-line:radix
    this.saveID = parseInt(this.route.snapshot.paramMap.get('id') + '');
    if (isNaN(this.saveID)){
      this.router.navigate(['/product-list']);
    }
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      s => {
        this.products = s;
      });
    console.log(this.products);
  }
  navigateToProductSite(): void {
    this.productService.getProductByID(this.saveID).subscribe(p => this.product = p);
  }
}
