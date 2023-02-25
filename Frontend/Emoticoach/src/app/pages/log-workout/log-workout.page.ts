import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ExerciseComponent } from './exercise/exercise.component';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-log-workout',
  templateUrl: './log-workout.page.html',
  styleUrls: ['./log-workout.page.scss'],
})
export class LogWorkoutPage implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  myDate : Date = new Date();
  date : string = this.myDate.toISOString();
  workoutName : string =  "workout " + this.myDate.getMonth() + "/" + this.myDate.getDate();

  activities: any[] = [];
  constructor(private servSession: SessionService) {}

  ngOnInit() {
    this.activities = this.servSession.getSessions("1");
    this.activities = this.activities[0].activity;
    console.log("in the low-workoutpage");
    console.log(this.activities);
  }

  addNewComponent(){
    this.container.createComponent(ExerciseComponent);
  }
  
}
