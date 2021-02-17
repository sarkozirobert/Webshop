import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../interfaces/product';
import {Sizes} from '../../interfaces/sizes';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  pr: Product;

  constructor( ) {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.pr = {id: 0, name: '', details: '', price: 0, color: '', gender: '', type: '', size: Sizes = { sizeS= '', sizeM = '', sizeL = '', sizeXl = ''}};
  }

  ngOnInit(): void {}
}
