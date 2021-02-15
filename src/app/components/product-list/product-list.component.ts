import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { products } from '../../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = products;
  filter!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
