import { Injectable } from '@angular/core';
import { user } from './Iuser';
import { HttpClient } from '@angular/common/http';
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


  constructor(private requestAccountService: RequestAccountService, private http: HttpClient) {
    this.userInfo = new Account("");
    this.user$ = new Subject();
    //Remove this ;ater this defaults it to justins hard coded token for testing
    // AccountService.user_token = CHAD_TOKEN
    }

  login(username:string , password: string): Observable<any>{
    this.requestAccountService.getUserToken(username, password).subscribe( d => {
      this.user$.next(d)
      AccountService.user_token = d.token;
      console.log(AccountService.user_token)
      AccountService.user_email = d.email;
      AccountService.user_firstname = d.first_name;
      AccountService.user_lastname = d.last_name;
    });
    return this.user$;
  }

  logout(): Observable<any>{
    this.requestAccountService.logout().subscribe( d => {
      this.user$.next(d)
    });
    return this.user$;
  }

  editAccountInfo(first_name:string, last_name:string, email:string, password:string):Observable<any>{
    this.requestAccountService.editAccountInfo(first_name, last_name, email, password).subscribe( d => {
      this.user$.next(d)
    });
    return this.user$;
  }

  returnUserToken(){
    return AccountService.user_token;
  }

  returnUserEmail(){
    return AccountService.user_email;
  }


  returnUserFirstName(){
    return this.capitalizeFirstLetter(AccountService.user_firstname);
  }

  returnUserLastName(){
    return this.capitalizeFirstLetter(AccountService.user_lastname);
  }


  returnFirstLastName(){
    this.user_first_last = (this.capitalizeFirstLetter(AccountService.user_firstname) + " " + this.capitalizeFirstLetter(AccountService.user_lastname))
    return this.user_first_last;
  }

  capitalizeFirstLetter(input:string){
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}

