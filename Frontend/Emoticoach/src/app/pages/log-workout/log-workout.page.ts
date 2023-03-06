import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { session } from 'src/app/services/sessions/session/Isession';
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
  

  constructor(private servSession: SessionService) {
    this.currentSession = new Session("");
  }

  ngOnInit() {
    this.loadSession()    
  }

  addNewComponent(){
    this.servSession.addActivity();
    this.loadSession();
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
    this.loadSession();

    this.servSession.saveSession(this.currentSession); 
  }
  
}
