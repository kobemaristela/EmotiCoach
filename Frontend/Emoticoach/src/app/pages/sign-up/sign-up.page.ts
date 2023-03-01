import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  
  userData = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: ''
  }

  constructor(public navCtrl: NavController) { }

  ngOnInit() {}

  toLogin() {}

  toRegister(){
    this.registerRequest();
  }

  async registerRequest(){
    const formData = new FormData();
    formData.append("first_name", this.userData.firstName);
    formData.append("last_name", this.userData.lastName);
    formData.append("email", this.userData.email);
    formData.append("username", this.userData.username);
    formData.append("password", this.userData.password);

    let tableParam = {
      method: "POST",
      body: formData
  }
  const res = await fetch("https://emotidev.maristela.net/user/register", tableParam);
  let registerResponse = await res.json();
  console.log(registerResponse);
  }
}
