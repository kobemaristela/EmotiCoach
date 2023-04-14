import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {
  templates:string[] = ["template 1"];
  templatesTitle:string[] = [];

  constructor(private navCtrl: NavController) { }

  addTemplate(){
    this.navCtrl.navigateForward('/template-creator');
  }

  ngOnInit() {
  }

}
