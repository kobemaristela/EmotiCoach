import { Component, OnInit,  ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccountService } from 'src/app/services/user/account.service';

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
  isLoggedIn = false;
  
  constructor(private accountService: AccountService, public navCtrl: NavController) { }

  ngOnInit(){
    if(this.accountService.isLoggedIn){
      this.isLoggedIn = true;
    }
  }

  async toHomepage(){

  }
}