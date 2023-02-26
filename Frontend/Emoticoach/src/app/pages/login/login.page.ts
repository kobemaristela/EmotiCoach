import { Component, OnInit,  ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData = {
    username: '',
    password: ''
    }
  
  constructor(public navCtrl: NavController) { }

  ngOnInit(){}

  toHomepage(){
    this.registerRequest();
    this.navCtrl.navigateForward('/home') //add once login is complete
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
  }
}