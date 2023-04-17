import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { user } from 'src/app/services/user/Iuser';
import { AccountService } from 'src/app/services/user/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user_email: string;

  user_pass: string;
  user_firstname: string;
  user_lastname: string;

  user_firstlast: string;
  accountPage: boolean;
  emotibitPage: boolean;
  settingsPage: boolean;
  accountButton: string; //outline: not selected, solid: selected
  emotibitButton: string;
  settingsButton: string;
  timezone: string;


  user: Observable<any>;
  user$: Observable<user>;


  constructor(private accountService: AccountService, private theme: ThemeService,  public navCtrl: NavController) {
    this.accountPage = true;
    this.emotibitPage = false;
    this.settingsPage = false;
    this.accountButton = "solid"
    this.emotibitButton = "outline"
    this.settingsButton = "outline"

    this.user_firstname = "";
    this.user_lastname = "";
    this.user_email = "";
    this.user_pass = "";
   }

  displayFirstName(){
    this.user_firstname = this.accountService.returnUserFirstName();
  }

  displayLastName(){
    this.user_lastname = this.accountService.returnUserLastName();
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


  editInfo(){
    console.log(this.user_firstname)
    console.log(this.user_lastname)
    console.log(this.user_email)
    this.accountService.editAccountInfo(this.user_firstname,this.user_lastname,this.user_email,this.user_pass)
  }

  ngOnInit() {
    this.displayFirstName()
    this.displayLastName()
    this.displayEmail()
    this.displayName()
    this.displayTimezone()
  }

  changeTheme(){
    this.theme.activeTheme();
  }
  logout() {
    this.navCtrl.navigateRoot('/login')
  }
}
