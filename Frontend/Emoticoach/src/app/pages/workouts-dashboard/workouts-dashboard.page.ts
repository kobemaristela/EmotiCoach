import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { session } from 'src/app/services/sessions/session/Isession';
import { sessionRequest } from 'src/app/services/sessions/session/IsessionRequest';
import { SessionService } from 'src/app/services/sessions/session/session.service';

@Component({
  selector: 'app-workouts-dashboard',
  templateUrl: './workouts-dashboard.page.html',
  styleUrls: ['./workouts-dashboard.page.scss'],
})
export class WorkoutsDashboardPage implements OnInit {
  sessions: sessionRequest[] = [];
  
  constructor(private servSession: SessionService) { 
    
  }

  ngOnInit() {
    this.loadSessions();
  }

  //calls the get session function from the service to do the api call and set the current session
  loadSessions() {    
    this.servSession.getSessions().subscribe((res)=> {
      this.sessions = [...this.sessions, ...res];
      console.log("loading sessions", this.sessions)
    });
    
  }

  loadSession(index: number) {
    this.servSession.loadSession(this.sessions[index].id)

  }

  createNewSession() {
    this.servSession.createBlankSession();
  }

}
