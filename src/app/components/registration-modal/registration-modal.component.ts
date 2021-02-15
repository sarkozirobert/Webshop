import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
export class RegistrationModalComponent implements OnInit {

  @Input()
  user: User;
  registrationForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
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
    this.registrationForm = {firstName: '', lastName: '', email: '', password: '', address: '', city: '', country: '', zip: 0, phoneNum: 0
    };
  }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  submit(): void {
    this.activeModal.close();
  }

  createRegistrationForm(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      email: new FormControl(this.user.email, [Validators.email, Validators.required]),
      password: new FormControl(this.user.password, [Validators.minLength(6), Validators.required]),
      address: new FormControl(this.user.address, Validators.required),
      city: new FormControl(this.user.city, Validators.required),
      country: new FormControl(this.user.country, Validators.required),
      zip: new FormControl(this.user.zip, Validators.required),
      phoneNum: new FormControl(this.user.phoneNum, Validators.required)
    });
  }

}
