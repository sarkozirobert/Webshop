import {Component, Input, OnInit} from '@angular/core';
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
  filterForGender: string;
  @Input()
  pr: Product;
  // refreshSubsrciption: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
  ) {
    this.products = [];
    this.filter = '';
    this.filterForGender = '';
    this.pr = {id: 0, name: '', details: '', price: 0, color: '', gender: '', type: '', imageId: 0};
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      pr => {
        this.products = pr;
      });
    this.productService.getGenderType().subscribe(
      pr => {
        this.products = pr;
      });
  }
}
