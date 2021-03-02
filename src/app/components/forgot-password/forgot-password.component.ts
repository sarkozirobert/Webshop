import {Component, Input, OnInit} from '@angular/core';
import {Signin} from '../../interfaces/signin';
import {SigninResponse} from '../../interfaces/signin-response';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Token} from '../../interfaces/token';
import {SigninService} from '../../services/signin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {ConfirmMessageResponse} from '../../interfaces/confirm-message-response';
import {ConfirmMessage} from '../../interfaces/confirm-message';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @Input()
  signIn: Signin;
  pswToken: string | null;
  // tslint:disable-next-line:ban-types
  login: SigninResponse;
  registrationForm: FormGroup;
  @Input()
  token: Token;
  showLoginError: boolean;
  messageConfirm: ConfirmMessageResponse;

  constructor( private route: ActivatedRoute, private signinService: SigninService,
               private router: Router, private tokenService: TokenService) {
    this.showLoginError = false;
    this.signIn = {username: '', password: ''};
    // @ts-ignore
    this.registrationForm = {username: '', password: ''};
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
    this.pswToken = '';
    this.messageConfirm = {
      success : false,
      // @ts-ignore
      message: {
        // @ts-ignore
        message: ''
      }
    };
  }

  ngOnInit(): void {
    this.pswToken = this.route.snapshot.paramMap.get('pswToken');
    console.log(this.pswToken);
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
    this.signinService.forgottenPassword(this.token.token, this.registrationForm.value.username).subscribe(response => {
        this.messageConfirm = response;
        if (this.messageConfirm.success) {
          // TODO signinservice eltárolja, hogy beléptünk és ki lépett be
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
      username: new FormControl(this.signIn.username, [Validators.email, Validators.required]),
      password: new FormControl(this.signIn.password, [Validators.minLength(6), Validators.required])
    });
  }
  pswNew(): void{
    this.showLoginError = false;
    this.signinService.newPassword(this.token.token, this.registrationForm.value,
      this.pswToken).subscribe(response => {
      this.messageConfirm = response;
      if (this.messageConfirm.success) {
          // TODO signinservice eltárolja, hogy beléptünk és ki lépett be
        } else {
          this.showLoginError = true;
        }
      },
      error => {
        this.showLoginError = true;
      });
  }

}
