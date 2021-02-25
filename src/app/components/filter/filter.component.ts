import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductFilter} from '../../interfaces/product-filter';
import {ProductsService} from '../../services/products.service';
import {Category} from '../../interfaces/category';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) {
    this.filter = {name: '', gender: '', type: '', color: '', priceMin: 0, priceMax: 0};
    this.search = new EventEmitter();
    this.categories = [];
  }

  ngOnInit(): void {
    this.productService.getGenderType().subscribe(
      cat => {
        this.categories = cat;
      });
  }

  onSearch(): void{
    this.search.emit(this.filter);
  }
}
