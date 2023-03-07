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
    password: '',
    }

  user_token = '';

  isLoggedIn = false;
  
  constructor(private accountService: AccountService, public navCtrl: NavController) { }

  ngOnInit(){
    if(this.accountService.isLoggedIn){
      this.isLoggedIn = true;
    }
  }

  getUserToken(){
    return this.user_token;
  }

  toHomepage(){
    this.registerRequest();
    if(this.isLoggedIn){
      this.navCtrl.navigateForward('/tabs/home') //add once login is complete
    }
  }

  async registerRequest(){
    const formData = new FormData();
    formData.append("username", this.userData.username);
    formData.append("password", this.userData.password);

    let tableParam = {
      method: "POST",
      body: formData
  }
  const res = await fetch("https://emotidev.maristela.net/user/login", tableParam);
  let registerResponse = await res.json();
  console.log(registerResponse);
  console.log(this.isLoggedIn);
  //how to show user has successfully logged in?
  if(registerResponse["token"]){
    this.isLoggedIn = true;

    this.user_token = registerResponse["token"];

    console.log(this.isLoggedIn);

  }
  }
}