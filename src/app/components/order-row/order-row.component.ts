import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../interfaces/order';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tr[app-order-row]',
  templateUrl: './order-row.component.html',
  styleUrls: ['./order-row.component.css']
})
export class OrderRowComponent implements OnInit {

  @Input()
  order: Order;

  constructor() {
    this.order = {
      id: 0,
      totalPrice: 0,
      userID: 0,
      purchasedClothesList: [],
      finish: false
    };
  }

  ngOnInit(): void {
  }

}
