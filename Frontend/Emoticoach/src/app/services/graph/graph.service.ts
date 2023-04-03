import { Injectable } from '@angular/core';
import { volumeGraph } from './Ivolume';
import { RequestGraphService } from './reqeust-graph.service';
import { AccountService } from '../user/account.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private vgraph$: Subject<GraphService[]>;
  private mgraph$: Subject<GraphService[]>;
  private workouts$: Subject<GraphService[]>;

  constructor(private requestGraphService: RequestGraphService, private accountService: AccountService) {
    this.vgraph$ = new Subject();
    this.mgraph$ = new Subject();
    this.workouts$ = new Subject();
   }

  getVolumeXandY(start_date: string, activity: string): Observable<any>{
    this.requestGraphService.getVolumeData(start_date, activity).subscribe( d => {
      this.vgraph$.next(d)
    });
    return this.vgraph$;
  }
  
  getMuscleXandY(week_num: string): Observable<any>{
    this.requestGraphService.getMuscleGroups(week_num).subscribe( d => {
      this.mgraph$.next(d)
    });
    return this.mgraph$;
  }

  getActivityNames(): Observable<any>{
    this.requestGraphService.getWorkoutNames().subscribe( d => {
      this.workouts$.next(d);
  });
  return this.workouts$;
  }
}

