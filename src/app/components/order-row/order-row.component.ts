import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../interfaces/order';

@Component({
  selector: 'app-order-row',
  templateUrl: './order-row.component.html',
  styleUrls: ['./order-row.component.css']
})
export class OrderRowComponent implements OnInit {

  @Input()
  order: Order;

  constructor() { }

  ngOnInit(): void {
  }

}
