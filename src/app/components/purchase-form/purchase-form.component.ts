import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PurchasePackToSend} from '../../interfaces/purchase-pack-to-send';
import {PurchaseService} from '../../services/purchase.service';

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

  constructor(private purchaseService: PurchaseService) {
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
    this.p = {orderedItems: { id: 0, name: '', price: 0, size: '', quantity: 0, subTotal: 0}, id: 0, totalPrice: 0};
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
      zipcode: new FormControl(this.user.zipcode, Validators.required),
      phoneNumber: new FormControl(this.user.phoneNumber, Validators.required)
    });
  }

  sendPurchase(): void {
    this.purchaseService.sendPurchase(this.p).subscribe(response => console.log(response));
  }

}
