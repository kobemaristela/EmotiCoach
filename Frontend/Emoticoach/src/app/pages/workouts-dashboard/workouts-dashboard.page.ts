import { Component, OnInit } from '@angular/core';
import { session } from 'src/app/services/sessions/session/Isession';
import { SessionService } from 'src/app/services/sessions/session/session.service';

@Component({
  selector: 'app-workouts-dashboard',
  templateUrl: './workouts-dashboard.page.html',
  styleUrls: ['./workouts-dashboard.page.scss'],
})
export class WorkoutsDashboardPage implements OnInit {
  sessions: session[] = [];

  constructor(private servSession: SessionService) { 
    
  }

  ngOnInit() {
    this.sessions = this.servSession.getSessions()
  }

  goToSession(index: number) {
    this.servSession.setSession(index);
  }

  createNewSession() {
    this.servSession.createNewSession();
  }

}
