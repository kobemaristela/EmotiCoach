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

  constructor(private requestGraphService: RequestGraphService, private accountService: AccountService) {
    this.graph$ = new Subject();
    this.workouts$ = new Subject();
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

  getActivityNames(): Observable<any>{
    this.requestGraphService.getWorkoutNames().subscribe( d => {
      this.workouts$.next(d);
  });
  return this.workouts$;
  }
}

