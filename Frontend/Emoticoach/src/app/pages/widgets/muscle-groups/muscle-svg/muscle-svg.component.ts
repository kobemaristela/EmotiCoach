import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { muscleOpacity, muscleOptions } from './IOpacity-muscle';
import { ModalController } from '@ionic/angular';
import { ModalMuscleComponent } from '../modal-muscle/modal-muscle.component';



@Component({
  selector: 'app-muscle-svg',
  templateUrl: './muscle-svg.component.svg',
  styleUrls: ['./muscle-svg.component.scss'],
})
export class MuscleSvgComponent implements OnInit {
  @Output() muscleSelected = new EventEmitter<muscleOptions[]>();
  @Input() muscles: muscleOptions[] = ["chest"];
  @Input() canOpen = true;
  @Input() canSelect = true;
  fillColor = '#AB6868'


  opacity: muscleOpacity = {
    chest: 0,
    tricep: 0,
    bicep: 0,
    shoulder: 0,
    upper_back: 0,
    lower_back: 0,
    quadricep: 0,
    glute: 0,
    calve: 0,
    abdominal: 0,
    hamstring: 0
  }

  constructor(private modalCtrl: ModalController) {

  }

  ngOnInit() {
    for (let i = 0; i < this.muscles.length; i++) {
      let muscleO = this.muscles[i];
      this.opacity[muscleO] = 1;
    }
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
      console.log("confirming", data)
      type userKeyType = keyof typeof this.opacity; 
      Object.keys(this.opacity).forEach((key) => {
        this.opacity[key as userKeyType] = 0
      })
      this.muscles = data;
      for (let i = 0; i < this.muscles.length; i++) {
        this.opacity[this.muscles[i]] = 1
      }

      console.log("comfirming save of ", this.muscles)
      this.muscleSelected.emit(data)


    }
  }

  changeColor(body: muscleOptions) {

    if (!this.canSelect) {
      return
    }
    this.opacity[body] = (this.opacity[body] + 1) % 2

    if (this.muscles.includes(body)) {

      this.muscles.splice(this.muscles.indexOf(body), 1);

    } else {
      this.muscles.push(body)
    }
    console.log(this.muscles)


    this.muscleSelected.emit(this.muscles);

  }


}
