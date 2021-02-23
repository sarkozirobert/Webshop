import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Signin} from '../../interfaces/signin';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SigninService} from '../../services/signin.service';
import {Token} from '../../interfaces/token';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @Input()
  signIn: Signin;
  registrationForm: FormGroup;
  @Input()
  token: Token;
  // tslint:disable-next-line:max-line-length
  constructor(public activeModal: NgbActiveModal, private signinService: SigninService, private router: Router, private tokenService: TokenService) {
    // tslint:disable-next-line:no-unused-expression
    this.signIn = {email: '', password: ''};
    // @ts-ignore
    this.registrationForm = {email: '', password: ''};
    this.token =  {
      headerName: '',
      parameterName: '',
      token: ''
    };
  }
  ngOnInit(): void {
    this.createRegistrationForm();
    // @ts-ignore
    this.tokenService.getToken().subscribe(
      s => {
        // @ts-ignore
        this.token = s;
        console.log(this.token);
      });
  }
  submit(): void {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.signinService.logIn(this.token.token, this.registrationForm.value.email, this.registrationForm.value.password).subscribe(response => {
      // visszajelzés megjelenítése.
      console.log(response);
      this.activeModal.close();
    });
  }
  createRegistrationForm(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(this.signIn.email, [Validators.email, Validators.required]),
      password: new FormControl(this.signIn.password, [Validators.minLength(6), Validators.required])
    });
  }
}
