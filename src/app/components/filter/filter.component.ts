import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductFilter} from '../../interfaces/product-filter';
import {ProductsService} from '../../services/products.service';
import {Category} from '../../interfaces/category';
import {ActivatedRoute, Router} from '@angular/router';
import {Token} from '../../interfaces/token';
import {TokenService} from '../../services/token.service';
import {Product} from '../../interfaces/product';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  filter: ProductFilter;
  @Output()
  search: EventEmitter<ProductFilter>;
  categories: Category[];
  @Input()
  token: Token;
  @Input()
  pr: Product;
  products: Product[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private tokenService: TokenService
  ) {
    this.filter = {name: '', gender: '', type: '', color: '', priceMin: 0, priceMax: 0};
    this.search = new EventEmitter();
    this.categories = [];
    this.token = {
      headerName: '',
      parameterName: '',
      token: ''
    };
    this.pr = {id: 0, name: '', details: '', price: 0, color: '', gender: '', type: '', imageId: 0};
    this.products = [];
  }

  ngOnInit(): void {
    const loadCategory = this.route.snapshot.paramMap.get('category');
    this.productService.getGenderType().subscribe(
      cat => {
        this.categories = cat;
      });
    this.tokenService.getToken().subscribe(
      s => {
        this.token = s;
        if (loadCategory) {
          this.filter.gender = loadCategory;
          this.onSearch();
        }
      });
    this.productService.getProducts().subscribe(
      pr => {
        this.products = pr;
      });
  }

  onSearch(): void{
    this.search.emit(this.filter);
  }
}
