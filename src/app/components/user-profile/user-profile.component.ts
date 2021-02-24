import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserProfile} from '../../interfaces/userProfile';
import {UserService} from '../../services/user.service';
import {Order} from '../../interfaces/order';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile: UserProfile;
  profileForm: FormGroup;
  orders: Order[];
  showSuccess: boolean;

  constructor(private userService: UserService) {
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
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(response => this.userProfile = response);
    this.userService.getOrderData().subscribe(response => this.orders = response);
  }

  submit(): void {
    this.userService.modifyUser(this.profileForm.value).subscribe(() => {
      this.showSuccess = true;
    });
  }


}
