import { Component, OnInit,  ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  constructor(public navCtrl: NavController) { }

  ngOnInit(){}

  home(){
    this.navCtrl.navigateForward('/home')
  }

}