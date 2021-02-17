import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.css']
})
export class PurchaseFormComponent implements OnInit {

  @Input()
  user: User;
  purchaseForm: FormGroup;

  constructor() {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      city: '',
      country: '',
      zip: 0,
      phoneNum: 0
    };
    // @ts-ignore
    this.purchaseForm = {firstName: '', lastName: '', email: '', password: '', address: '', city: '', country: '', zip: 0, phoneNum: 0
    };
  }

  ngOnInit(): void {
    this.createPurchaseForm();
  }

  createPurchaseForm(): void {
    this.purchaseForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      address: new FormControl(this.user.address, Validators.required),
      city: new FormControl(this.user.city, Validators.required),
      country: new FormControl(this.user.country, Validators.required),
      zip: new FormControl(this.user.zip, Validators.required),
      phoneNum: new FormControl(this.user.phoneNum, Validators.required)
    });
  }

}
