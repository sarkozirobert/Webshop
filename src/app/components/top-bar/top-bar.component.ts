import {Component, Input, OnInit} from '@angular/core';
import {CartComponent} from '../cart/cart.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RegistrationModalComponent} from '../registration-modal/registration-modal.component';
import {SignInComponent} from '../sign-in/sign-in.component';
import {User} from '../../interfaces/user';
import {UserProfile} from '../../interfaces/userProfile';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Input()
  user: UserProfile;
// comment
  firstName: string | null;
  constructor(private modalService: NgbModal) {
    this.user = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      country: '',
      zipcode: 0,
      phoneNumber: ''
    };
    this.firstName = '';
    if (localStorage.length > 0) {
      this.firstName = localStorage.getItem('firstName');
    }
  }

  ngOnInit(): void {
  }
  openModifyModal(): void{
    const modalRef = this.modalService.open(CartComponent);
  }
  openRegistrationModal(): void{
    const modalRef = this.modalService.open(RegistrationModalComponent);
  }
  openSignInModal(): void{
    const modalRef = this.modalService.open(SignInComponent);
  }
}
