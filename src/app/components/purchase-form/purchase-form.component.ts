import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PurchasePackToSend} from '../../interfaces/purchase-pack-to-send';
import {PurchaseService} from '../../services/purchase.service';
import {PurchasedClothesList} from '../../interfaces/purchasedClothesList';
import {CartService} from '../../services/cart.service';
import {TokenService} from '../../services/token.service';
import {Token} from '../../interfaces/token';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserProfile} from '../../interfaces/userProfile';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.css']
})
export class PurchaseFormComponent implements OnInit {


  userProfile: UserProfile;
  purchaseForm: FormGroup;
  @Input()
  p: PurchasePackToSend;
  @Input()
  productsInCart: PurchasedClothesList[];
  @Input()
  totalPrice: number;
  @Input()
  token: Token;

  constructor(private purchaseService: PurchaseService, private cartService: CartService,
              private tokenService: TokenService, private router: Router,
              private userService: UserService) {
    // @ts-ignore
    this.userProfile = {
      firstName: '',
      lastName: '',
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
    this.p = {purchasedClothesList: { id: 0, name: '', price: 0, size: '', quantity: 0, subTotal: 0}, id: 0,
      totalPrice: 0, comment: '', finish: true, userId: 0};
    this.productsInCart = [];
    this.totalPrice = 0;
    // @ts-ignore
    this.token =  {headerName: '', parameterName: '', token: ''
    };
  }

  ngOnInit(): void {
    this.productsInCart = this.cartService.items;
    this.p.purchasedClothesList = this.productsInCart;
    this.p.totalPrice = this.sumPrice(this.p.purchasedClothesList);
    this.parseQuantityToNumber(this.p.purchasedClothesList);
    console.log(this.p);
    console.log(typeof this.p.purchasedClothesList[0].quantity);
    this.tokenService.getToken().subscribe(
      s => {
        // @ts-ignore
        this.token = s;
      });
    this.userService.getUserData().subscribe(r => this.userProfile = r);
    // this.loadPurchaseFormDetails();
  }

  sendPurchase(): void {
    this.purchaseService.sendPurchase(this.token.token, this.p).subscribe(response => console.log(response));
    this.router.navigateByUrl('/main');
    this.cartService.clearCart();
    // console.log(typeof this.p.comment);
    // console.log(this.p.comment);
  }

  sumPrice(productsInCart: PurchasedClothesList[]): number {
    this.totalPrice = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.p.purchasedClothesList.length; i++) {
      this.totalPrice = this.p.purchasedClothesList[i].subTotal + this.totalPrice;
    }
    return this.totalPrice;
  }

  parseQuantityToNumber(orderedItems: PurchasedClothesList[]): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.p.purchasedClothesList.length; i++) {
      this.p.purchasedClothesList[i].quantity = +this.p.purchasedClothesList[i].quantity;
    }
  }

  // loadPurchaseFormDetails(): void {
  //   this.userService.getUserData().subscribe(response => this.userProfile = {
  //     address: response.address, city: response.city, country: response.country, phoneNumber: response.phoneNumber,
  //     zipcode: response.zipcode, firstName: response.firstName, lastName: response.lastName
  //   });
  //   console.log(this.userProfile.firstName);
  // }
}
