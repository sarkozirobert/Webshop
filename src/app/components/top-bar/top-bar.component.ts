import { Component, OnInit } from '@angular/core';
import {CartComponent} from '../cart/cart.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RegistrationModalComponent} from '../registration-modal/registration-modal.component';
import {SignInComponent} from '../sign-in/sign-in.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  constructor(private modalService: NgbModal) {
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
