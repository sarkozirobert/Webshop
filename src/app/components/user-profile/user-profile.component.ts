import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserProfile} from '../../interfaces/userProfile';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input()
  userProfile: UserProfile;
  profileForm: FormGroup;

  constructor(private userService: UserService) {
    this.userProfile = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      country: '',
      zipcode: 0,
      phoneNumber: ''
    };
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.userProfile.firstName, Validators.required),
      lastName: new FormControl(this.userProfile.lastName, Validators.required),
      address: new FormControl(this.userProfile.address, Validators.required),
      city: new FormControl(this.userProfile.city, Validators.required),
      country: new FormControl(this.userProfile.country, Validators.required),
      zipcode: new FormControl(this.userProfile.zipcode, Validators.required),
      phoneNumber: new FormControl(this.userProfile.phoneNumber, Validators.minLength(6))
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.userService.modifyUser(this.profileForm.value).subscribe(response => {
      console.log(response);
    });
  }
}
