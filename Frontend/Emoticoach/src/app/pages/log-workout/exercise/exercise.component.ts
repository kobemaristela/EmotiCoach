import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ExerciseSetComponent } from './exercise-set/exercise-set.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  excerciseName : string = "Bench";
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef

  sets : any[] = [];
  setCount : number = 1;
  constructor() { }

  ngOnInit() {}
  addNewComponent(){
    this.container.createComponent(ExerciseSetComponent);
    this.setCount++;
  }
}
