import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Signin} from '../../interfaces/signin';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SigninService} from '../../services/signin.service';
import {Token} from '../../interfaces/token';
import {TokenService} from '../../services/token.service';
import {SigninResponse} from '../../interfaces/signin-response';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @Input()
  signIn: Signin;
  // tslint:disable-next-line:ban-types
  login: SigninResponse;
  registrationForm: FormGroup;
  @Input()
  token: Token;
  showLoginError: boolean;
  constructor(public activeModal: NgbActiveModal, private signinService: SigninService,
              private router: Router, private tokenService: TokenService) {
    this.showLoginError = false;
    this.signIn = {email: '', password: ''};
    // @ts-ignore
    this.registrationForm = {email: '', password: ''};
    this.token =  {
      headerName: '',
      parameterName: '',
      token: ''
    };
    this.login = {
      success: false,
      list: {
        // @ts-ignore
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        userRole: ''
      },
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
    this.showLoginError = false;
    this.signinService.logIn(this.token.token, this.registrationForm.value.email,
      this.registrationForm.value.password).subscribe(response => {
          this.login = response;
          console.log(this.login);
          if (this.login.success) {
            // TODO signinservice eltárolja, hogy beléptünk és ki lépett be
            localStorage.setItem('firstName', this.login.list[0].firstName);
            localStorage.setItem('id', String(this.login.list[0].id));
            localStorage.setItem('token', this.token.token);
            this.activeModal.close();
            // tslint:disable-next-line:no-unused-expression
            location.reload();
          } else {
            this.showLoginError = true;
          }
    },
      error => {
        this.showLoginError = true;
      });
  }
  createRegistrationForm(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(this.signIn.email, [Validators.email, Validators.required]),
      password: new FormControl(this.signIn.password, [Validators.minLength(6), Validators.required])
    });
  }
}
