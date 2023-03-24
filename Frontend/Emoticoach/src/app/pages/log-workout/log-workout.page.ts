import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { session } from 'src/app/services/sessions/session/Isession';
import { Session } from 'src/app/services/sessions/session/Session';
import { Activity } from 'src/app/services/sessions/activity/Activity';
import { MUSCLE_LIST } from 'src/environments/environment';
import { Observable, Subject, debounceTime, map, throttleTime } from 'rxjs';
 
@Component({
  selector: 'app-log-workout',
  templateUrl: './log-workout.page.html',
  styleUrls: ['./log-workout.page.scss'],
})
export class LogWorkoutPage implements OnInit {
  currentSession: session;
  currentSession$: Subject<session>;
  muscleList = MUSCLE_LIST;


  constructor(private servSession: SessionService) {
    this.currentSession = new Session("");  
  }

  ngOnInit() {
    this.loadSession(); 
  }

  addNewComponent(){
    console.log("adding acitvity");
    this.servSession.addActivity();
    this.loadSession();

  }

  loadSession(){
    this.currentSession$ = this.servSession.getCurrentSession();
    this.currentSession$.pipe(throttleTime(1000))
    this.currentSession$.subscribe( data => {
      console.log("loading session", data);
      this.currentSession = data;
    })



  }

  saveSession(){
    console.log("saving in logworkout", this.currentSession);
    this.servSession.saveSession(); 
    this.servSession.getSessions();
  }

  goBack(){
    
  }
  
  
}
