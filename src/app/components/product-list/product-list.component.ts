import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../interfaces/product';
import {Category} from '../../interfaces/category';
import {ProductFilter} from '../../interfaces/product-filter';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  @Input()
  pr: Product;
  // refreshSubsrciption: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
  ) {
    this.products = [];
    this.pr = {id: 0, name: '', details: '', price: 0, color: '', gender: '', type: '', imageId: 0};
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      pr => {
        this.products = pr;
      });
  }

  doSearch(filter: ProductFilter): void {
    this.productService.getRequestFilter(filter).subscribe(resp => this.products = resp);
  }
}
