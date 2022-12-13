import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  headers: any;

  constructor(public navCtrl: NavController) {
  }

  ngOnInit() {
  }

  graphHR(){
    this.navCtrl.navigateForward('/graph-hr')
  }

}
