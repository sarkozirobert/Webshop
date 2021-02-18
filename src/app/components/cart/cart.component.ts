import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Product[];

  constructor(public activeModal: NgbActiveModal) {
    this.products = [];
  }

  ngOnInit(): void {
  }
  submit(): void {
      this.activeModal.close();
    }


  }
