import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Signin} from '../../interfaces/signin';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @Input()
  signIn: Signin;
  registrationForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
    // tslint:disable-next-line:no-unused-expression
    this.signIn = {email: '', password: ''};
    // @ts-ignore
    this.registrationForm = {email: '', password: ''};
  }
  ngOnInit(): void {
    this.createRegistrationForm();
  }
  submit(): void {
    this.activeModal.close();
  }
  createRegistrationForm(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(this.signIn.email, [Validators.email, Validators.required]),
      password: new FormControl(this.signIn.password, [Validators.minLength(6), Validators.required])
    });
  }

}