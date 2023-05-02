import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { sessionRequest } from 'src/app/services/sessions/session/IsessionRequest';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { Observable, Subscription, debounceTime } from 'rxjs';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-workouts-dashboard',
  templateUrl: './workouts-dashboard.page.html',
  styleUrls: ['./workouts-dashboard.page.scss'],
})
export class WorkoutsDashboardPage implements OnInit {
  months: number = 1;
  sessions: sessionRequest[] = [];
  sessions$: Observable<sessionRequest[]>
  deleting: boolean;
  currentSelected: boolean[];
  date: Date;
  loadMore = false;

  constructor(
    private servSession: SessionService,
    private theme: ThemeService,
    private navCtrl: NavController) {
    this.date = new Date();

  }


  ngOnInit() {
    this.date.setMonth(this.date.getMonth() - this.months)
    this.loadSessions();
    this.deleting = false;

  }

  //calls the get session function from the service to do the api call and set the current session
  loadSessions() {

    this.sessions$ = this.servSession.getSessions(this.getDate(), 100);
    this.sessions$
      .subscribe((res) => {
        if (this.loadMore) {
          this.sessions = this.sessions.concat(res.slice().reverse());
          this.loadMore = false;

        } else {
          this.sessions = res.slice().reverse();

        }

 
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

  confirmDelete() {
    this.deleting = !!!this.deleting
    let toDelete: number[] = [];
    for (let i = 0; i < this.currentSelected.length; i++) {
      if (this.currentSelected[i]) {
        toDelete.push(this.sessions[i].id);
      }
    }
    for (let i = 0; i < toDelete.length; i++) {
      this.deleteSession(toDelete[i], 1000000);
    }

    this.currentSelected = new Array(this.sessions.length);
  }

  async deleteSession(sessionId: number, index: number) {
    this.sessions.splice(index, 1)
    this.servSession.deleteSession(sessionId).subscribe(data => {

      console.log(data);
      if (data.status) {
        this.loadSessions();

      }
    });


  }

  deletingSessions() {
    this.deleting = !!!this.deleting
    this.currentSelected = new Array(this.sessions.length);
  }

  handleClick(index: number) {
    if (this.deleting) {

      this.currentSelected[index] = !!!this.currentSelected[index];
      console.log("dekting", this.currentSelected)
    } else {
      this.loadSession(index)
    }

  }

  private getDate(): string {

    return this.date.toISOString().split('T')[0]

  }

  loadMoreSessions(event: any) {
    this.loadMore = true;
    this.months += 1;
    this.date.setMonth(this.date.getMonth() - this.months)
    this.loadSessions();
    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();

    }, 500

    );
  }

}
