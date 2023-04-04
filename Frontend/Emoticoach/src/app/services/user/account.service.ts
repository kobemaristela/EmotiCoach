import { Injectable } from '@angular/core';
import { user } from './Iuser';
import { Account } from './Account';
import { RequestAccountService } from './request-account.service';
import { Observable, Subject } from 'rxjs';
import { accountRequest } from './IaccountRequest';
import { CHAD_TOKEN } from 'src/environments/tokens';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userInfo: user;
  isLoggedIn: false;
  static user_token: string = "";

  private user$: Subject<accountRequest[]>;


  constructor(private requestAccountService: RequestAccountService) {
    this.userInfo = new Account("");
    this.user$ = new Subject();
    //Remove this ;ater this defaults it to justins hard coded token for testing
    AccountService.user_token = CHAD_TOKEN
    }

  login(username:string , password: string): Observable<any>{
    this.requestAccountService.getUserToken(username, password).subscribe( d => {
      this.user$.next(d)
      AccountService.user_token = d.token;
      console.log(AccountService.user_token);
    });
    return this.user$;
  }

  returnUserToken(){
    return AccountService.user_token;
  }
}

