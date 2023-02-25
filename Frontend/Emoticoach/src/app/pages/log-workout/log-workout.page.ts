import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ExerciseComponent } from './exercise/exercise.component';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { session } from 'src/app/services/sessions/session/Isession';
import { activity } from 'src/app/services/sessions/activity/Iactivity';
import { Activity } from 'src/app/services/sessions/activity/Activity';
import { Session } from 'src/app/services/sessions/session/Session';

@Component({
  selector: 'app-log-workout',
  templateUrl: './log-workout.page.html',
  styleUrls: ['./log-workout.page.scss'],
})
export class LogWorkoutPage implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  currentSession: session;
  activities: activity[] = [];

  
  constructor(private servSession: SessionService) {
    this.currentSession = {id: "", name: "", duration:0, datetime:"",muscleGroups:[],activities:[]};
  }

  ngOnInit() {
    console.log("in the log-workoutpage");
    this.currentSession = this.servSession.getCurrentSession();
    this.activities = this.currentSession.activities;
  }

  addNewComponent(){
    this.activities.push(new Activity("0"))
    
  }

  saveSession(){
    console.log("saving in logworkout.ts");
    this.servSession.updateCurrentSession(this.currentSession);
    this.servSession.saveSession();
    
  }
  
}
