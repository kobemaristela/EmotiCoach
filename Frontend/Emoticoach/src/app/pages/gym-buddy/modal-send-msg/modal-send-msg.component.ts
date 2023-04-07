import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-send-msg',
  templateUrl: './modal-send-msg.component.html',
  styleUrls: ['./modal-send-msg.component.scss'],
})
export class ModalSendMsgComponent implements OnInit {
  user_name:string = "";
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.user_name, 'confirm');
  }
}
