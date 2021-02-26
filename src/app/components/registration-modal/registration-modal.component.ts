import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Token} from '../../interfaces/token';
import {TokenService} from '../../services/token.service';
import {ConfirmMessageResponse} from '../../interfaces/confirm-message-response';
import {ConfirmMessage} from '../../interfaces/confirm-message';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
export class RegistrationModalComponent implements OnInit {
  @Input()
  token: Token;
  @Input()
  user: User;
  registrationForm: FormGroup;
  showRegError: boolean;
  confirm: ConfirmMessageResponse;

  // tslint:disable-next-line:max-line-length
  constructor(public activeModal: NgbActiveModal, private userService: UserService, private router: Router, private tokenService: TokenService) {
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
    this.token =  {
      headerName: '',
      parameterName: '',
      token: ''
    };
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.registrationForm = {firstName: '', lastName: '', email: '', password: '', address: '', city: '', country: '', zipcode: 0, phoneNumber: ''
    };
    this.showRegError = false;
    // @ts-ignore
    this.confirm = {
      success: false,
      message: {
        // @ts-ignore
        message: ''
      },
    };
  }

  ngOnInit(): void {
    this.createRegistrationForm();
    this.tokenService.getToken().subscribe(
      s => {
        // @ts-ignore
        this.token = s;
        console.log(this.token);
      });
  }

  submit(): void {
    this.showRegError = false;
    this.userService.addUser(this.token.token, this.registrationForm.value).subscribe(response => {
      this.confirm = response;
      if (this.confirm.success) {
        this.activeModal.close();
      }else{
        this.showRegError = true;
      }
    },
      error => {
          this.showRegError = true;
    });
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
      zipcode: new FormControl(this.user.zipcode, Validators.required),
      phoneNumber: new FormControl(this.user.phoneNumber, Validators.minLength(6))
    });
  }

}
