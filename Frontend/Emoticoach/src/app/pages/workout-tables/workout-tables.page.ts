import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { sessionRequest } from 'src/app/services/sessions/session/IsessionRequest';
import { RequestSessionService } from 'src/app/services/sessions/session/request-session.service';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { IactivityRow, IactivityTable } from './IactivityTable';

@Component({
  selector: 'app-workout-tables',
  templateUrl: './workout-tables.page.html',
  styleUrls: ['./workout-tables.page.scss'],
})
export class WorkoutTablesPage implements OnInit {
  sortDirectionWork: number = 0;
  sortDirectionDate: number = 0;

  range: 1 | 7 | 28 = 7;
  weekToFetch:number = 0;

  sessions$: Observable<IactivityTable>
  daterange: string;
  activities: IactivityRow[] = [];


  constructor(private reqSesServ: RequestSessionService) {

  }


  ngOnInit() {
    this.loadSessions();
  }

  sortBy(column: string) {
    if (column == "workout") {
      this.sortDirectionDate = 0;
      
      this.sortDirectionWork = this.sortDirectionWork % 3 + 1;
      if (this.sortDirectionWork == 1){
        this.activities.sort((a,b) => (a.activity > b.activity) ? 1 : ((b.activity > a.activity) ? -1 : 0))
      } else  if (this.sortDirectionWork == 2){
        this.activities.sort((a,b) => (b.activity > a.activity) ? 1 : ((a.activity > b.activity) ? -1 : 0))
      }


    } else if (column == "date") {
      this.sortDirectionWork = 0;
      this.sortDirectionDate = this.sortDirectionDate % 3 + 1;
      if (this.sortDirectionDate == 1){
        this.activities.sort((a,b) => ((new Date(a.date) > new Date(b.date))) ? 1 : ((new Date(b.date) > new Date(a.date)) ? -1 : 0))
      } else if (this.sortDirectionDate == 2){
        this.activities.sort((b,a) => ((new Date(a.date) > new Date(b.date))) ? 1 : ((new Date(b.date) > new Date(a.date)) ? -1 : 0))
      }
    }
  }

  loadSessions() {
    this.sessions$ = this.reqSesServ.postGetActivityTable(this.range, this.weekToFetch);
    this.sessions$.subscribe((res) => {
      this.activities = res.table;
      this.daterange = res.daterange
      console.log("loading sessions", res)
    });

  }

  goFirst() {
    this.weekToFetch = 0;
    this.loadSessions();
  }

  prevPage() {
    this.weekToFetch += 1;
    this.loadSessions();
  }
  loadData() {
    this.loadSessions();
  }
  nextPage(){
    this.weekToFetch -= 1;
    if (this.weekToFetch < 0) {
      this.weekToFetch = 0
    }
    this.loadSessions();

  }

  goBackAMonth(){
    this.weekToFetch += 4;
    this.loadSessions();
  }
}
