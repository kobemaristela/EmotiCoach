import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAddFriendsComponent } from './modal-add-friends/modal-add-friends.component';

declare var google: any;

@Component({
  selector: 'app-gym-buddy',
  templateUrl: './gym-buddy.page.html',
  styleUrls: ['./gym-buddy.page.scss'],
})
export class GymBuddyPage implements OnInit {
  currentPage = "feed";

  constructor( private modalCtrl: ModalController) { 
  }

  ngOnInit() {
  }

  toFeed() {
    this.currentPage = "feed";
  }

  toFriends() {
    this.currentPage = "friends";
  }

  async openModal() {
    if ( this.currentPage == "friends") {
      const modal = await this.modalCtrl.create({
        component: ModalAddFriendsComponent,
      });
      modal.present();
    }
   

    // const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
  }


}

