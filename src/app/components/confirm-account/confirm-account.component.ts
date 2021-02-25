import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SigninService} from '../../services/signin.service';
import {ConfirmAccountService} from '../../services/confirm-account.service';
import {ConfirmMessageResponse} from '../../interfaces/confirm-message-response';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {
token: string | null;
messageConfirm: ConfirmMessageResponse;
success: boolean;
  constructor(private route: ActivatedRoute, private confirmAccountService: ConfirmAccountService,
              private router: Router) {
    this.token = '';
    this.messageConfirm = {
      success : false,
      // @ts-ignore
      list : ''
    };
    this.success = false;
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.confirmAccountService.confirm(this.token).subscribe(
      s => {
        // @ts-ignore
        this.messageConfirm = s;
  });
  }

}
