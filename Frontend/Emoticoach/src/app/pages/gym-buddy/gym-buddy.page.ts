import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAddFriendsComponent } from './modal-add-friends/modal-add-friends.component';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Observable } from 'rxjs';
import { chat } from 'src/app/services/chat/IChat';
import { BuddyService } from 'src/app/services/buddy/buddy.service';

declare var google: any;

@Component({
  selector: 'app-gym-buddy',
  templateUrl: './gym-buddy.page.html',
  styleUrls: ['./gym-buddy.page.scss'],
})
export class GymBuddyPage implements OnInit {
  currentPage: string = "feed";
  feedselected: boolean = false;


  constructor(private modalCtrl: ModalController, private buddyService: BuddyService) {
  }

  ngOnInit() {

  }

  goBack() { }

  toFeed() {
    this.currentPage = "feed";
  }

  toFriends() {
    this.currentPage = "friends";
  }

  async openModal() {
    if (this.currentPage == "friends") {
      const modal = await this.modalCtrl.create({
        component: ModalAddFriendsComponent,
      });
      modal.present();


      const { data, role } = await modal.onWillDismiss()

      if (role == "confirm") {
        console.log("confirming", data)
        this.buddyService.addFriend(data);

      }
    }
  }



}

