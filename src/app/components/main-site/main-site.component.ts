import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Category} from '../../interfaces/category';

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css']
})
export class MainSiteComponent implements OnInit {

  categories: Category[];
  @Input()
  cat: Category;

  constructor(private productService: ProductsService) {
    this.categories = [];
    this.cat = {gender: '', imageId: 0};
  }
  ngOnInit(): void {
    this.productService.getGenderType().subscribe(
      cat => {
        this.categories = cat;
      });
  }
}
