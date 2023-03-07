import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { session } from 'src/app/services/sessions/session/Isession';
import { sessionRequest } from 'src/app/services/sessions/session/IsessionRequest';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-workouts-dashboard',
  templateUrl: './workouts-dashboard.page.html',
  styleUrls: ['./workouts-dashboard.page.scss'],
})
export class WorkoutsDashboardPage implements OnInit {
  sessions: sessionRequest[] = [];
  
  constructor(private servSession: SessionService, private navCtrl: NavController) { 
    
  }

  ngOnInit() {
    this.loadSessions();
  }

  //calls the get session function from the service to do the api call and set the current session
  loadSessions() {    
    this.servSession.getSessions().subscribe((res)=> {
      this.sessions = res;
      console.log("loading sessions", this.sessions)
    });
    
  }

  loadSession(index: number) {
    this.servSession.loadSession(this.sessions[index].id)
    this.navCtrl.navigateForward('/log-workout')
  }

  createNewSession() {
    this.servSession.createBlankSession()
    
  }

  async deleteSession(sessionId:number) {
    this.servSession.deleteSession(sessionId).subscribe( data => {
      console.log(data);
      if (data.status){
        this.loadSessions();
      }
    });
    
  }
}
