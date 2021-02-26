import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PurchasePackToSend} from '../../interfaces/purchase-pack-to-send';
import {PurchaseService} from '../../services/purchase.service';
import {OrderedItem} from '../../interfaces/ordered-item';
import {CartService} from '../../services/cart.service';
import {TokenService} from '../../services/token.service';
import {Token} from '../../interfaces/token';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.css']
})
export class PurchaseFormComponent implements OnInit {

  @Input()
  user: User;
  purchaseForm: FormGroup;
  p: PurchasePackToSend;
  productsInCart: OrderedItem[];
  totalPrice: number;
  @Input()
  token: Token;

  constructor(private purchaseService: PurchaseService, private cartService: CartService, private tokenService: TokenService) {
    // @ts-ignore
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      city: '',
      country: '',
      zipcode: 0,
      phoneNumber: ''
    };
    // @ts-ignore
    this.purchaseForm = {firstName: '', lastName: '', email: '', password: '', address: '', city: '', country: '', zipcode: 0, phoneNumber: ''
    };
    // @ts-ignore
    this.p = {orderedItems: { id: 0, name: '', price: 0, size: '', quantity: 0, subTotal: 0}, id: 0,
      totalPrice: 0, comment: ''};
    this.productsInCart = [];
    this.totalPrice = 0;
    // @ts-ignore
    this.token =  {headerName: '', parameterName: '', token: ''
    };
  }

  ngOnInit(): void {
    this.createPurchaseForm();
    this.productsInCart = this.cartService.items;
    this.p.orderedItems = this.productsInCart;
    this.p.totalPrice = this.sumPrice(this.p.orderedItems);
    this.parseQuantityToNumber(this.p.orderedItems);
    console.log(this.p);
    console.log(typeof this.p.orderedItems[0].quantity);
    this.tokenService.getToken().subscribe(
      s => {
        // @ts-ignore
        this.token = s;
      });
  }

  createPurchaseForm(): void {
    this.purchaseForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      address: new FormControl(this.user.address, Validators.required),
      city: new FormControl(this.user.city, Validators.required),
      country: new FormControl(this.user.country, Validators.required),
      zipcode: new FormControl(this.user.zipcode, Validators.required),
      phoneNumber: new FormControl(this.user.phoneNumber, Validators.required)
    });
  }

  sendPurchase(): void {
    this.purchaseService.sendPurchase(this.token.token, this.p).subscribe(response => console.log(response));
    console.log(typeof this.p.comment);
    console.log(this.p.comment);
  }

  sumPrice(productsInCart: OrderedItem[]): number {
    this.totalPrice = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.p.orderedItems.length; i++) {
      this.totalPrice = this.p.orderedItems[i].subTotal + this.totalPrice;
    }
    return this.totalPrice;
  }

  parseQuantityToNumber(orderedItems: OrderedItem[]): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.p.orderedItems.length; i++) {
      this.p.orderedItems[i].quantity = +this.p.orderedItems[i].quantity;
    }
  }
}
