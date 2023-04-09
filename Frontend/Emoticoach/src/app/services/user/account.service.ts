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
  static user_email: string = "";
  static user_firstname: string = "";
  static user_lastname: string = "";
  user_first_last: string = "";

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
      AccountService.user_email = d.email;
      AccountService.user_firstname = d.first_name;
      AccountService.user_lastname = d.last_name;
    });
    return this.user$;
  }

  returnUserToken(){
    return AccountService.user_token;
  }

  returnUserEmail(){
    return AccountService.user_email;
  }

  returnFirstLastName(){
    this.user_first_last = (this.capitalizeFirstLetter(AccountService.user_firstname) + " " + this.capitalizeFirstLetter(AccountService.user_lastname))
    return this.user_first_last;
  }

  capitalizeFirstLetter(input:string){
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}

