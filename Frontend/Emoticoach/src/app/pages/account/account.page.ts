import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/user/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user_email: string;
  user_firstlast: string;
  accountPage: boolean;
  emotibitPage: boolean;
  settingsPage: boolean;
  accountButton: string; //outline: not selected, solid: selected
  emotibitButton: string;
  settingsButton: string;
  timezone: string;

  constructor(private accountService: AccountService) {
    this.accountPage = true;
    this.emotibitPage = false;
    this.settingsPage = false;
    this.accountButton = "solid"
    this.emotibitButton = "outline"
    this.settingsButton = "outline"
   }

  displayEmail(){
    this.user_email = this.accountService.returnUserEmail();
  }
  displayName(){
    this.user_firstlast = this.accountService.returnFirstLastName();
  }

  displayAccountPage(){
    this.accountButton = "solid"
    this.emotibitButton = "outline"
    this.settingsButton = "outline"
    this.accountPage = true;
    this.emotibitPage = false;
    this.settingsPage = false;
  }
  displayEmotibitPage(){
    this.accountButton = "outline"
    this.emotibitButton = "solid"
    this.settingsButton = "outline"
    this.accountPage = false;
    this.emotibitPage = true;
    this.settingsPage = false;
  }

  displaySettingsPage(){
    this.accountButton = "outline"
    this.emotibitButton = "outline"
    this.settingsButton = "solid"
    this.accountPage = false;
    this.emotibitPage = false;
    this.settingsPage = true;
  }

  displayTimezone(){
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return this.timezone;
  }

  ngOnInit() {
    this.displayEmail()
    this.displayName()
    this.displayTimezone()
  }

}
