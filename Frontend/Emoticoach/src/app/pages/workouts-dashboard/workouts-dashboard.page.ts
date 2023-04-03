import { Component, OnInit } from '@angular/core';
import { sessionRequest } from 'src/app/services/sessions/session/IsessionRequest';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-workouts-dashboard',
  templateUrl: './workouts-dashboard.page.html',
  styleUrls: ['./workouts-dashboard.page.scss'],
})
export class WorkoutsDashboardPage implements OnInit {
  sessions: sessionRequest[] = [];
  sessions$: Observable<sessionRequest[]>
  
  constructor(private servSession: SessionService, private navCtrl: NavController) { 
    
  }


  ngOnInit() {
    this.loadSessions();
  }

  //calls the get session function from the service to do the api call and set the current session
  loadSessions() {    
    this.sessions$ = this.servSession.getSessions();
    this.sessions$.subscribe((res)=> {
      this.sessions = res;
      console.log("loading sessions", this.sessions)
    });

  }

  loadSession(index: number) {
    this.servSession.loadSession(this.sessions[index].id);
    this.navCtrl.navigateForward('/log-workout');
    this.servSession.clearDeletes();
  }

  createNewSession() {
    this.servSession.createBlankSession();
    this.servSession.clearDeletes();
    this.navCtrl.navigateForward('/log-workout');
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
