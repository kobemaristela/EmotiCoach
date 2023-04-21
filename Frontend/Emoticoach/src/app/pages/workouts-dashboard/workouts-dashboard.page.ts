import { Component, OnInit } from '@angular/core';
import { sessionRequest } from 'src/app/services/sessions/session/IsessionRequest';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-workouts-dashboard',
  templateUrl: './workouts-dashboard.page.html',
  styleUrls: ['./workouts-dashboard.page.scss'],
})
export class WorkoutsDashboardPage implements OnInit {
  sessions: sessionRequest[] = [];
  sessions$: Observable<sessionRequest[]>
  deleting: boolean;
  currentSelected: boolean[];


  constructor(private servSession: SessionService, private theme: ThemeService,private navCtrl: NavController) { 
    
  }


  ngOnInit() {
    this.loadSessions();
    this.deleting = false;

  }

  //calls the get session function from the service to do the api call and set the current session
  loadSessions() {    
    this.sessions$ = this.servSession.getSessions();
    this.sessions$.subscribe((res)=> {
      this.sessions = res.slice().reverse();
      console.log("loading sessions", this.sessions)
      this.currentSelected = new Array(this.sessions.length);
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

  confirmDelete(){
    this.deleting = !!!this.deleting
    let toDelete: number[] = [];
    for (let i = 0; i < this.currentSelected.length; i++){
      if(this.currentSelected[i]){
        toDelete.push(this.sessions[i].id);
      }
    }
    for (let i = 0; i < toDelete.length; i++){
      this.deleteSession(toDelete[i]);
    }

    this.currentSelected = new Array(this.sessions.length);
  }

  async deleteSession(sessionId:number) {
    
    this.servSession.deleteSession(sessionId).subscribe( data => {
      console.log(data);
      if (data.status){
        this.loadSessions();
      }
    });
    

  }

  deletingSessions(){
    this.deleting = !!!this.deleting
    this.currentSelected = new Array(this.sessions.length);
  }

  handleClick(index:number) {
    if(this.deleting){

      this.currentSelected[index] = !!!this.currentSelected[index];
      console.log("dekting", this.currentSelected)
    } else {
      this.loadSession(index)
    }

  }
}
