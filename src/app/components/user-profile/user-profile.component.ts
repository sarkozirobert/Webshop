import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserProfile} from '../../interfaces/userProfile';
import {UserService} from '../../services/user.service';
import {Order} from '../../interfaces/order';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {Token} from '../../interfaces/token';
import {OrderItemDisplay} from '../../interfaces/order-item-display';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile: UserProfile;
  profileForm: FormGroup;
  orders: Order[];
  orderItemsForTable: OrderItemDisplay[];
  showSuccess: boolean;

  @Input()
  token: Token;


  constructor(private userService: UserService, private route: ActivatedRoute, private tokenService: TokenService ) {
    this.showSuccess = false;
    this.userProfile = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      country: '',
      zipcode: 0,
      phoneNumber: ''
    };
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.userProfile.firstName, Validators.required),
      lastName: new FormControl(this.userProfile.lastName, Validators.required),
      address: new FormControl(this.userProfile.address, Validators.required),
      city: new FormControl(this.userProfile.city, Validators.required),
      country: new FormControl(this.userProfile.country, Validators.required),
      zipcode: new FormControl(this.userProfile.zipcode, Validators.required),
      phoneNumber: new FormControl(this.userProfile.phoneNumber, Validators.minLength(6))
    });
    this.orders = [];
    this.orderItemsForTable = [];

    this.token =  {
      headerName: '',
      parameterName: '',
      token: ''
    };
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(r => this.userProfile = r);
    this.userService.getOrderData().subscribe(resp => {
      this.orders = resp;
      for (const order of this.orders) {
        let first = true;
        for (const pc of order.purchasedClothesList) {
          this.orderItemsForTable.push(
            first
              ? {...pc, orderId : order.id, totalPrice: order.totalPrice, itemCount: order.purchasedClothesList.length}
              : pc
          );
          first = false;
        }
      }
    });
    this.tokenService.getToken().subscribe(res => this.token = res);
    console.log(this.token);
  }

  submit(): void {
    this.userService.modifyUser(this.token.token, this.profileForm.value).subscribe(response => {
      this.userService.refreshUser(response.t);
      this.showSuccess = true;
    });
  }
}
