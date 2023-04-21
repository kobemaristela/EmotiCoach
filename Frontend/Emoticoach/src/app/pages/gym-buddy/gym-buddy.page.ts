import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAddFriendsComponent } from './modal-add-friends/modal-add-friends.component';
import { ModalSendMsgComponent } from './modal-send-msg/modal-send-msg.component';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Observable } from 'rxjs';
import { chat } from 'src/app/services/chat/IChat';

declare var google: any;

@Component({
  selector: 'app-gym-buddy',
  templateUrl: './gym-buddy.page.html',
  styleUrls: ['./gym-buddy.page.scss'],
})
export class GymBuddyPage implements OnInit {
  currentPage: string = "feed";
  msg: string = "";
  constructor( private modalCtrl: ModalController, private chatService: ChatService) { 
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

  }
  async sendMsg() {
    this.chatService.addChatMsg(this.msg);
      // const modal = await this.modalCtrl.create({
      //   component: ModalSendMsgComponent,
      // });
      // modal.present();

    // const { data, role } = await modal.onWillDismiss();
  }


}

