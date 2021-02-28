import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Category} from '../../interfaces/category';
import {Product} from '../../interfaces/product';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css']
})
export class MainSiteComponent implements OnInit {

  categories: Category[];
  products: Product[];
  @Input()
  cat: Category;
  @Input()
  pr: Product;


  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.categories = [];
    this.products = [];
    this.cat = {gender: '', imageId: 0};
    this.pr = {color: '', gender: '', name: '', price: 0, type: '', details: '', imageId: 0};
  }
  ngOnInit(): void {
    this.productService.getGenderType().subscribe(
      cat => {
        this.categories = cat;
      });
    this.productService.getProducts().subscribe(
      pr => {
        this.products = pr;
      });
  }
}
