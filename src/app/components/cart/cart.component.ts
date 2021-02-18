import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderedItem} from '../../interfaces/ordered-item';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productsInCart: OrderedItem[];

  constructor(public activeModal: NgbActiveModal) {
    this.productsInCart = [];
  }

  ngOnInit(): void {
  }
  submit(): void {
      this.activeModal.close();
    }


  }
