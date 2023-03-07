import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { session } from 'src/app/services/sessions/session/Isession';
import { Session } from 'src/app/services/sessions/session/Session';
import { Activity } from 'src/app/services/sessions/activity/Activity';

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
    this.servSession.addActivity();
    this.currentSession.activities.push(new Activity("0"))
  }

  loadSession(){
    this.servSession.getCurrentSession()
      .subscribe(res => {
        this.currentSession = res
        console.log("current session", this.currentSession)
      });
  }

  goBack(){

  }
  
  saveSession(){
    console.log("saving in logworkout.ts");
    this.servSession.updateDate(this.currentSession.datetime);
    

    this.servSession.saveSession(); 
  }
  
}
