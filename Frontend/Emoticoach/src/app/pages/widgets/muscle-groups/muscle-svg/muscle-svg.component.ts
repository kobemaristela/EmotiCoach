import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { muscleOpacity, muscleOptions } from './IOpacity-muscle';



@Component({
  selector: 'app-muscle-svg',
  templateUrl: './muscle-svg.component.svg',
  styleUrls: ['./muscle-svg.component.scss'],
})
export class MuscleSvgComponent implements OnInit {
  @Output() muscleSelected = new EventEmitter<muscleOptions[]>();
  @Input() canClick = true;
  @Input() selectedMuscles: muscleOptions[] = [];

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
  constructor() { 
    for(let i = 0; i < this.selectedMuscles.length; i++){
      let muscle = this.selectedMuscles[i]; 
      this.opacity[muscle] = 1;
    }
  }

  ngOnInit() {
    
  }

  changeColor(body:muscleOptions){
    if (!this.canClick){
      return
    }
    this.opacity[body] = (this.opacity[body] + 1) % 2
    
    if (this.selectedMuscles.includes(body)){
   
      this.selectedMuscles.splice(this.selectedMuscles.indexOf(body), 1);

    } else {
      this.selectedMuscles.push(body)
    }
    console.log(this.selectedMuscles)
    this.muscleSelected.emit(this.selectedMuscles);

  }

  
}
