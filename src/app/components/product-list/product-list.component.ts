import {Component, Input, OnInit,} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../interfaces/product';
import {ProductFilter} from '../../interfaces/product-filter';
import {Token} from '../../interfaces/token';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  @Input()
  pr: Product;
  @Input()
  token: Token;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private tokenService: TokenService
  ) {
    this.products = [];
    this.pr = {id: 0, name: '', details: '', price: 0, color: '', gender: '', type: '', imageId: 0};
    this.token = {
      headerName: '',
      parameterName: '',
      token: ''
    };
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      pr => {
        this.products = pr;
      });
    this.tokenService.getToken().subscribe(
      s => {
        this.token = s;
        console.log(this.token);
      });
  }

  doSearch(filter: ProductFilter): void {
    this.productService.getRequestFilter(this.token.token, filter).subscribe(resp => this.products = resp);
  }
}
