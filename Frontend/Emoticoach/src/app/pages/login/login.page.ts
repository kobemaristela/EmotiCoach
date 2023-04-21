import { Component, OnInit,  ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { user } from 'src/app/services/user/Iuser';
import { AccountService } from 'src/app/services/user/account.service';
import { accountRequest } from 'src/app/services/user/IaccountRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AccountService]
})
export class LoginPage implements OnInit {

  userData = {
    username: '',
    password: ''
    }

  user_token = '';
  user: Observable<any>;
  user$: Observable<user>;
  isLoggedIn = false;
  
  constructor(private accountService: AccountService, public navCtrl: NavController) { }

  ngOnInit(){
    if(this.accountService.isLoggedIn){
      this.isLoggedIn = true;
    }
  }

  async toHomepage(){
    this.user$ = this.accountService.login(this.userData.username, this.userData.password);
    this.user$.subscribe((res)=> {
      if(res){
        this.navCtrl.navigateRoot('/tabs/home')
      }
    })
  }
}