import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../interfaces/product';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css']
})
export class MainSiteComponent implements OnInit {

  products: Product[];
  @Input()
  pr: Product;

  constructor(private productService: ProductsService) {
    this.products = [];
    this.pr = {id: 0, name: '', details: '', price: 0, color: '', gender: '', type: '', imageId:  0};
  }
  ngOnInit(): void {
    this.productService.getGenderType().subscribe(
      pr => {
        this.products = pr;
      });
  }
}
