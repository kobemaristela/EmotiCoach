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
  public currentDateFormatted: string;
  public previousDateFormatted: string;
  private dd: string;
  private mm: string;
  private yyyy: number;

  constructor(private requestGraphService: RequestGraphService, private accountService: AccountService) {
    this.graph$ = new Subject();
    this.workouts$ = new Subject();
    this.currentDate = new Date();
    this.dd = String(this.currentDate.getDate()).padStart(2, '0');
    this.mm = String(this.currentDate.getMonth() + 1).padStart(2, '0');
    this.yyyy = this.currentDate.getFullYear();
    this.currentDateFormatted = this.yyyy + '-' + this.mm + '-' + this.dd;
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

  formatDate(date: Date){
    this.dd = String(date.getDate()).padStart(2, '0');
    this.mm = String(date.getMonth() + 1).padStart(2, '0');
    this.yyyy = date.getFullYear();
    this.formattedDate = this.yyyy + '-' + this.mm + '-' + this.dd;
    return this.formattedDate;
  }

  getCurrentDate(){
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
  }

  getPreviousWeek(){
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 7);
  }

  getNextWeek(){
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 7);
  }

  getActivityNames(): Observable<any>{
    this.requestGraphService.getWorkoutNames().subscribe( d => {
      this.workouts$.next(d);
  });
  return this.workouts$;
  }
}

