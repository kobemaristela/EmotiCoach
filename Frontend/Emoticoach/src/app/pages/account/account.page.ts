import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { data } from 'cypress/types/jquery';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { user } from 'src/app/services/user/Iuser';
import { AccountService } from 'src/app/services/user/account.service';
import { IconRequest } from './change-avatar/IIconRequest';

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
  selectedAvatar: IconRequest;

  changingAvatar: boolean;

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

    this.selectedAvatar = {
      id: "",
      icon: ""
    }
    this.changingAvatar = false;
   }

  sentFromChild($event: any): void{
    this.changingAvatar = false;
    this.selectedAvatar = $event;
   }

  displayUserInfo(){
    this.user_firstname = this.accountService.returnUserFirstName();
    this.user_lastname = this.accountService.returnUserLastName();
    this.user_email = this.accountService.returnUserEmail();
    this.user_firstlast = this.accountService.returnFirstLastName();
    this.selectedAvatar.icon = this.accountService.returnUserIcon();
  }

  displayAccountPage(){
    console.log(this.selectedAvatar)
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

  changeAvatar(){
    this.changingAvatar = true;
  }

  async editInfo(){
    this.user$ = this.accountService.editAccountInfo(this.user_firstname, this.user_lastname, this.user_email, this.user_pass, this.selectedAvatar.id);
    this.user$.subscribe((res)=> {
    })
  }

  async logout(){
    this.user$ = this.accountService.logout();
    this.user$.subscribe((res)=> {
      if(res){
        this.navCtrl.navigateForward('/login')
      }
    })
  }
  async deleteAccount(){
    this.user$ = this.accountService.deleteAccount();
    this.user$.subscribe((res)=> {
      if(res){
        this.navCtrl.navigateForward('/login')
      }
    })
  }

  ngOnInit() {
    this.displayUserInfo();
    this.displayTimezone();
  }

  changeTheme(){
    this.theme.activeTheme();
  }
}
