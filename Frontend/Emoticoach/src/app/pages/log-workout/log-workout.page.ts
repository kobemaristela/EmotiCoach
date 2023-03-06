import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ExerciseComponent } from './exercise/exercise.component';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { session } from 'src/app/services/sessions/session/Isession';
import { activity } from 'src/app/services/sessions/activity/Iactivity';
import { Activity } from 'src/app/services/sessions/activity/Activity';
import { Session } from 'src/app/services/sessions/session/Session';
import { map } from 'rxjs';
@Component({
  selector: 'app-log-workout',
  templateUrl: './log-workout.page.html',
  styleUrls: ['./log-workout.page.scss'],
})
export class LogWorkoutPage implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  currentSession: session;
 

  
  constructor(private servSession: SessionService) {
    this.currentSession = new Session("");
  }

  ngOnInit() {
    this.loadSession()
    
  }

  addNewComponent(){
    this.currentSession.activities.push(new Activity("0"))
    
  }
  loadSession(){
    this.servSession.getCurrentSession()
      .subscribe(res => {
        this.currentSession = res
        this.currentSession.activities = this.currentSession.activities
        console.log("cs & activities",this.currentSession)
      });
  }
  saveSession(){
    console.log("saving in logworkout.ts");
    this.servSession
    this.servSession.saveSession(); 
  }
  
}
