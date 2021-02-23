import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../interfaces/product';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-gender-card',
  templateUrl: './gender-card.component.html',
  styleUrls: ['./gender-card.component.css']
})
export class GenderCardComponent implements OnInit {

  products: Product[];
  @Input()
  pr: Product;

  constructor(private productService: ProductsService) {
    this.products = [];
    this.pr = {id: 0, name: '', details: '', price: 0, color: '', gender: '', type: '', imageId: 0};
  }

  ngOnInit(): void {
    this.productService.getGenderType().subscribe(
      pr => {
        this.products = pr;
      });
  }

}
