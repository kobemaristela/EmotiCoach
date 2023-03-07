import { Injectable } from '@angular/core';
import { user } from './Iuser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userInfo: user;
  isLoggedIn: false;
  constructor() { }
}
