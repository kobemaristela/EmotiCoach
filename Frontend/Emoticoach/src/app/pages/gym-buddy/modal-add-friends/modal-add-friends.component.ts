import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add-friends',
  templateUrl: './modal-add-friends.component.html',
  styleUrls: ['./modal-add-friends.component.scss'],
})
export class ModalAddFriendsComponent implements OnInit {
  user_name: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.user_name, 'confirm');
  }

}
