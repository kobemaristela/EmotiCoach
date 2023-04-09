import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MUSCLE_LIST } from 'src/environments/environment';
import { ModalMuscleComponent } from '../modal-muscle/modal-muscle.component';
import { Output, EventEmitter } from '@angular/core';
import { MuscleSvgComponent } from '../muscle-svg/muscle-svg.component';
import { muscleOptions } from '../muscle-svg/IOpacity-muscle';


@Component({
  selector: 'app-muscle-groups',
  templateUrl: './muscle-groups.component.html',
  styleUrls: ['./muscle-groups.component.scss'],
})
export class MuscleGroupsComponent implements OnInit {
  @Output() newMuscleList = new EventEmitter<muscleOptions[]>();
  @Input() muscles: muscleOptions[] = ["chest"];
  @Input() canOpen = true;
  @Input() canSelect = true;

  muscleList = MUSCLE_LIST

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    
  }

  async openModal() {
    if (!this.canOpen) {
      return
    }

    const modal = await this.modalCtrl.create({
      component: ModalMuscleComponent,
      componentProps: {
        muscles: this.muscles
      }

    });

    modal.present();

    const { data, role } = await modal.onWillDismiss()

    if (role == "confirm") {
      this.muscles = data;
      this.newMuscleList.emit(data)
     

    }
  }


  muscleSelected(event:any){
    console.log("emiting in mg", event)
  
    this.newMuscleList.emit(event)
   
  }


}
