import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MUSCLE_LIST } from 'src/environments/environment';
import { ModalMuscleComponent } from '../modal-muscle/modal-muscle.component';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-muscle-groups',
  templateUrl: './muscle-groups.component.html',
  styleUrls: ['./muscle-groups.component.scss'],
})
export class MuscleGroupsComponent implements OnInit {
  @Output() newMuscleList = new EventEmitter<string[]>();
  @Input() muscles: string[] = ["chest"];
  CanOpen = true;

  @Input() width: string = "100";
  @Input() height: string = "100";
  muscleList = MUSCLE_LIST

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openModal() {

    const modal = await this.modalCtrl.create({
      component: ModalMuscleComponent,
      componentProps: {
        muscles: this.muscles
      }
      
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss()
    if (role == "confirm") {
     this.newMuscleList.emit(data)
    }
  }


}
