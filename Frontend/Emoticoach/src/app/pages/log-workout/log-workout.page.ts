import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ExerciseComponent } from './exercise/exercise.component';

@Component({
  selector: 'app-log-workout',
  templateUrl: './log-workout.page.html',
  styleUrls: ['./log-workout.page.scss'],
})
export class LogWorkoutPage implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef

  myDate : Date = new Date()
  date : string = this.myDate.toISOString();
  workoutName : string =  "workout " + this.myDate.getMonth() + "/" + this.myDate.getDate();

  currentWorkout = {
    id: 0,
    name: 'Lift',
    type: '',
  };


  constructor() { }

  ngOnInit() {
  }

  compareWith(o1 : any, o2 : any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev : any) {
    this.currentWorkout = ev.target.value;
    console.log(this.currentWorkout);
  }

  addNewComponent(){
    this.container.createComponent(ExerciseComponent);
  }
  
}
