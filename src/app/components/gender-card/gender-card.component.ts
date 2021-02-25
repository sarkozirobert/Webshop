import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Category} from '../../interfaces/category';

@Component({
  selector: 'app-gender-card',
  templateUrl: './gender-card.component.html',
  styleUrls: ['./gender-card.component.css']
})
export class GenderCardComponent implements OnInit {

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
