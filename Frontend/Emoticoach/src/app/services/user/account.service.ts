import { Injectable } from '@angular/core';
import { user } from './Iuser';
import { HttpClient } from '@angular/common/http';
import { Account } from './Account';
import { RequestAccountService } from './request-account.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { accountRequest } from './IaccountRequest';
import { CHAD_TOKEN } from 'src/environments/tokens';
import { Keychain } from '@awesome-cordova-plugins/keychain/ngx';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userInfo: user;
  isLoggedIn: boolean;
  static user_token: string = "";
  static user_email: string = "";
  static user_firstname: string = "";
  static user_lastname: string = "";
  static user_icon: string = "";
  static username: string = "";
  user_first_last: string = "";

  private user$: BehaviorSubject<accountRequest>;


  constructor(private requestAccountService: RequestAccountService, private http: HttpClient, private keychain: Keychain) {
    this.userInfo = new Account("");
    this.user$ = new BehaviorSubject(this.userInfo);
    //Remove this ;ater this defaults it to justins hard coded token for testing
    // AccountService.user_token = CHAD_TOKEN

  }

  login(username: string, password: string): Observable<any> {
    this.requestAccountService.getUserToken(username, password).subscribe(d => {
      this.user$.next(d)
      AccountService.user_token = d.token;
      AccountService.user_email = d.email;
      AccountService.user_firstname = d.first_name;
      AccountService.user_lastname = d.last_name;
      AccountService.user_icon = d.icon;
      this.isLoggedIn = true;
      this.saveToken();

    });

    return this.user$;
  }

  logout(): Observable<any> {
    this.isLoggedIn = false;
    this.keychain.set('logged_in', JSON.stringify(this.isLoggedIn), false).then(() => {
      this.keychain.get('logged_in')
        .then(value => console.log('Got value', value))
        .catch(err => console.error('Error getting', err));
    })
    return this.requestAccountService.logout()
  }

  deleteAccount(): Observable<any> {
    this.requestAccountService.deleteAccount().subscribe(d => {
      this.user$.next(d)
    });
    return this.user$;
  }

  editAccountInfo(first_name: string, last_name: string, email: string, password: string, profile_picture: string): Observable<any> {
    this.requestAccountService.editAccountInfo(first_name, last_name, email, password, profile_picture).subscribe(d => {
      this.user$.next(d)
    });
    return this.user$;
  }

  returnUserToken() {
    return AccountService.user_token;
  }

  returnUserEmail() {
    return AccountService.user_email;
  }

  returnUserIcon() {
    return AccountService.user_icon;
  }


  returnUserFirstName() {
    return this.capitalizeFirstLetter(AccountService.user_firstname);
  }

  returnUserLastName() {
    return this.capitalizeFirstLetter(AccountService.user_lastname);
  }


  returnFirstLastName() {
    this.user_first_last = (this.capitalizeFirstLetter(AccountService.user_firstname) + " " + this.capitalizeFirstLetter(AccountService.user_lastname))
    return this.user_first_last;
  }

  capitalizeFirstLetter(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  saveToken() {
    this.keychain.set('user_token', AccountService.user_token, false).then(() => {
      this.keychain.get('user_token')
        .then(value => console.log('Got value', value))
        .catch(err => console.error('Error getting', err));
    })
      .catch(err => console.error('Error setting', err));

    this.keychain.set('logged_in', JSON.stringify(this.isLoggedIn), false).then(() => {
      this.keychain.get('logged_in')
        .then(value => console.log('Got value', value))
        .catch(err => console.error('Error getting', err));
    })
  }

  checkKeyChain() {
    return this.keychain.get('logged_in');

  }

  loadProfile() {
    this.keychain.get('user_token')
      .then(value => {
        console.log('Got value', value);
        AccountService.user_token = value;
        this.requestAccountService.getProfile().subscribe(d=>{
          AccountService.user_email = d.email;
          AccountService.user_firstname = d.first_name;
          AccountService.user_lastname = d.last_name;
          AccountService.username = d.username
          AccountService.user_icon = d.icon;
        })
      })
      .catch(err => console.error('Error getting', err));
  }

}

