import {Component, Input, OnInit} from '@angular/core';
import {Token} from '../../interfaces/token';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {LogoutService} from '../../services/logout.service';
import {timeInterval} from 'rxjs/operators';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  @Input()
  token: Token;
  showLogoutError: boolean;

  constructor(private logoutService: LogoutService, private router: Router, private tokenService: TokenService) {
    this.token =  {
      headerName: '',
      parameterName: '',
      token: ''
    };
    this.showLogoutError = false;
  }

  ngOnInit(): void {
    this.tokenService.getToken().subscribe(
      s => {
        // @ts-ignore
        this.token = s;
        console.log(this.token);
      });
  }
  logOutMethod(): void {
    this.showLogoutError = false;
    this.logoutService.logout(this.token.token).subscribe(response => {
      this.showLogoutError = true;
      localStorage.clear();
      this.router.navigate(['main']);
    });
  }
  back(): void{
    this.router.navigate(['main']);
  }
}
