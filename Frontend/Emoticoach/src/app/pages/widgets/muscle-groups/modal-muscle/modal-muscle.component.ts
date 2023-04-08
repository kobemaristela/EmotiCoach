import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MUSCLE_LIST } from 'src/environments/environment';

@Component({
  selector: 'app-modal-muscle',
  templateUrl: './modal-muscle.component.html',
  styleUrls: ['./modal-muscle.component.scss'],
})
export class ModalMuscleComponent implements OnInit {
  user_name: string;
  muscles: string[];
  muscleList = MUSCLE_LIST;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.muscles, 'confirm');
  }
}
