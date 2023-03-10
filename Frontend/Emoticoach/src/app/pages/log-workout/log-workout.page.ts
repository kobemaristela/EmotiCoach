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
  currentSession: session;
  created = false;

  constructor(private servSession: SessionService) {
    this.currentSession = new Session("");
  }

  ngOnInit() {
    this.loadSession()    
  }

  addNewComponent(){
    console.log("adding acitvity");
    this.servSession.addActivity()
    this.loadSession();
  }

  async loadSession(){
    this.currentSession = await this.servSession.getCurrentSession()
  }

  saveSession(){
    console.log("saving in logworkout.ts");
    // this.servSession.updateDate(this.currentSession.datetime);
    this.servSession.saveSession(); 
  }

  goBack(){
    
  }
  
  
}
