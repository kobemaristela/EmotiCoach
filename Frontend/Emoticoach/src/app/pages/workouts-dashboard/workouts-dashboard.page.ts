import { Component, OnInit } from '@angular/core';
import { session } from 'src/app/services/Isession';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-workouts-dashboard',
  templateUrl: './workouts-dashboard.page.html',
  styleUrls: ['./workouts-dashboard.page.scss'],
})
export class WorkoutsDashboardPage implements OnInit {
  sessions: session[] = [];

  constructor(private servSession: SessionService) { }

  ngOnInit() {
    this.sessions = this.servSession.getSessions("1234")
  }

}
