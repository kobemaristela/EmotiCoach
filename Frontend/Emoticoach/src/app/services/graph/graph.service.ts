import { Injectable } from '@angular/core';
import { volumeGraph } from './Ivolume';
import { RequestGraphService } from './reqeust-graph.service';
import { AccountService } from '../user/account.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private graph$: Subject<GraphService[]>;
  private workouts$: Subject<GraphService[]>;
  public currentDate: Date;
  private formattedDate: string;
  private dd: string;
  private mm: string;
  private yyyy: number;

  constructor(private requestGraphService: RequestGraphService, private accountService: AccountService) {
    this.graph$ = new Subject();
    this.workouts$ = new Subject();
    this.currentDate = new Date();
   }

  getVolumeXandY(start_date: string, activity: string): Observable<any>{
    this.requestGraphService.getVolumeData(start_date, activity).subscribe( d => {
      this.graph$.next(d)
    });
    return this.graph$;
  }

  getOneRMXandY(start_date: string, activity: string): Observable<any>{
    this.requestGraphService.getOneRMData(start_date, activity).subscribe( d => {
      this.graph$.next(d)
    });
    return this.graph$;
  }
  
  getMuscleXandY(week_num: string): Observable<any>{
    this.requestGraphService.getMuscleGroups(week_num).subscribe( d => {
      this.graph$.next(d)
    });
    return this.graph$;
  }

  formatDateforAPI(date: Date){
    this.dd = String(date.getDate()).padStart(2, '0');
    this.mm = String(date.getMonth() + 1).padStart(2, '0');
    this.yyyy = date.getFullYear();
    this.formattedDate = this.yyyy + '-' + this.mm + '-' + this.dd;
    return this.formattedDate;
  }

  formatDate(date: Date){
    this.dd = String(date.getDate()).padStart(2, '0');
    this.mm = String(date.getMonth() + 1).padStart(2, '0');
    this.formattedDate =  this.mm + '/' + this.dd;
    return this.formattedDate;
  }

  getCurrentDate(){
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
  }

  getPreviousWeek(date: Date){

    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
  }

  getNextWeek(date: Date){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6);
  }

  getRecentSunday(date: Date){
    return new Date(date.setDate(date.getDate() - date.getDay()));
  }

  getNextSaturday(date: Date){
    return new Date(date.setDate(date.getDate() + (6 + 7 - date.getDay()) % 7));

  }

  getActivityNames(): Observable<any>{
    this.requestGraphService.getWorkoutNames().subscribe( d => {
      this.workouts$.next(d);
  });
  return this.workouts$;
  }
}

