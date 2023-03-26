import { Injectable } from '@angular/core';
import { user } from './Iuser';
import { Account } from './Account';
import { RequestAccountService } from './request-account.service';
import { Observable, Subject } from 'rxjs';
import { accountRequest } from './IaccountRequest';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userInfo: user;
  isLoggedIn: false;

  private user$: Subject<accountRequest[]>;


  constructor(private requestAccountService: RequestAccountService) {
    this.userInfo = new Account("");
    this.user$ = new Subject();
    }
   }

