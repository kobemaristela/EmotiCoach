import { Injectable } from '@angular/core';
import { session } from './Isession';
import { Session } from './Session';
import { activity } from '../activity/Iactivity';
import { set } from '../sets/Iset';
import { RequestSessionService } from './request-session.service';

import { Observable, Subject, Subscription, first } from 'rxjs';
import { debounceTime, tap,throttleTime, } from 'rxjs/operators'
import { Activity } from '../activity/Activity';
import { Set } from '../sets/Set';
import { sessionRequest } from './IsessionRequest';
import { data } from 'cypress/types/jquery';


@Injectable({
  providedIn: 'root'
})

export class SessionService {
  private currentSession: session;
  private newSession: boolean = false;
  private date:Date;
  private session$: Subject<sessionRequest[]>;
  private currentSession$: Subject<session>;
  private setsToDelete: set[] = [];
  private activitiesToDelete: activity[] =[];

  constructor(private requestSessionService: RequestSessionService) { 
    this.date = new Date();
    this.currentSession = new Session("0","workout" + this.getDayMonth(), 0);
    this.session$ = new Subject();
    this.currentSession$ = new Subject();

  }

  //returns a list of all sessions and does an api call to get them
  getSessions(): Observable<any> {
    this.requestSessionService.getAllSessions().pipe(throttleTime(1000)).subscribe( v => {
      this.session$.next(v)
    });
    return this.session$;
  }
  
  getCurrentSession(): Subject<session> {
    this.currentSession$.next(this.currentSession);
    return this.currentSession$;
  }

  //searches through all the sessions to find a session with a given id
  //api call to get the session data needs to be added
  loadSession(sessionID: number) { 
    this.requestSessionService.postGetSessionObservable(sessionID).subscribe( (data) => {
      this.currentSession = data;
      this.currentSession$.next( this.currentSession)
      this.currentSession$.pipe(debounceTime(1000))
    })
  }

  getSessionAPI(sessionID: number) {
    this.requestSessionService.postGetSessionObservable(sessionID)
  }

  //returns the activities of a given session
  getActivites(): activity[] {
    return this.currentSession.activities
  }

  addActivity(): void {
    this.currentSession.activities.push(new Activity("0"));
  }

  updateActivity(activity: activity, index: number): void {
    console.log("updating activity",activity);
    this.currentSession.activities[index] = activity;
  }

  addSet(activityIndex: number, setIndex: number): void {
    this.currentSession.activities[activityIndex].sets.push(new Set(0,setIndex,0,0,0))
  }
    //updates the set of a given activity
  updateSet(activityIndex: number, setIndex: number, newSet: set): void {
    this.currentSession.activities[activityIndex].sets[setIndex] = newSet
  }

  updateDate(datetime:string) {
    this.currentSession.datetime = datetime
  }
  
  //saves session in the db when saved button is pressed
  //decieds if its a new save or an update to an existing entry
  saveSession() {
    console.log("saviong", this.currentSession)
    if (this.newSession) {
      console.log("saving new");
      this.createNewSession(this.currentSession);
    }
    else {
      console.log("saving existing");
      this.saveExistingSession(this.currentSession);
    }
   
  }

  //does a post request to update the table 
  createNewSession(toSave:session) {
    console.log("tosave", toSave);
    this.requestSessionService.postCreateNewSessionObservable(toSave)
    .subscribe(v => {
      this.getSessions();
      this.newSession = false;
    });
   
  }

  saveExistingSession(toSave:session) {
    console.log("Saving Session", toSave);
    if (!toSave.duration){
      toSave.duration = 0
    }
    this.requestSessionService.postSaveExistingSession(toSave.id, toSave.name, toSave.duration, toSave.datetime); 
    
    let saveActivities = toSave.activities;
    
    for (var i = 0; i < saveActivities.length; i++) {
      
      let currA = saveActivities[i];
      if (currA.id == "0"){
        console.log("creating activity", currA)
        this.requestSessionService.postSetAcitvity(toSave.id, currA.name, currA.muscleGroups, currA.sets);
      } else {
        
        console.log("saving activity", currA)
        this.requestSessionService.postSaveExistingActivity(currA.id, currA.name, currA.muscleGroups);
        
        for (var x = 0; x < currA.sets.length; x++) {
          
          if (currA.sets[x].id == 0){

            console.log("creating set", currA.sets[x])
            this.requestSessionService.postSetSet(currA.id,currA.sets[x]);

          } else {  
            console.log("saving set", currA.sets[x])
            this.requestSessionService.postSaveExistingSet(currA.sets[x])
          }

        }
      }
      }
      this.deleteExistings();
  }

  //Loop through both arrays of to delete and delete them after they click save
  private deleteExistings(){
    console.log("deleting existing")
    console.log(this.activitiesToDelete);
    console.log(this.setsToDelete);
    for (var x = 0; x < this.setsToDelete.length; x++) {
      console.log("deleting", this.setsToDelete[x])
      this.requestSessionService.postDeleteSet(this.setsToDelete[x].id.toString());
    };
    for (var x = 0; x < this.activitiesToDelete.length; x++) {
      console.log("deleting", this.activitiesToDelete[x])
      this.requestSessionService.postDeleteActivity(this.activitiesToDelete[x].id);
    };
   
  }

  deleteSession(sessionId:number) {
    return this.requestSessionService.postDeleteSessionObservable(sessionId);
  }

  deleteActivity(activityIndex: number){
    if (this.newSession){
      this.currentSession.activities.splice(activityIndex,1);
      // this.currentSession$.next(this.currentSession);
      return
    }
   
    let dAct = this.currentSession.activities[activityIndex];
    this.activitiesToDelete.push(dAct);
    this.currentSession.activities.splice(activityIndex,1);
    return
  }

  deleteSet(activityIndex: number, setIndex: number){
    if (this.newSession){
      this.currentSession.activities[activityIndex].sets.splice(setIndex,1);
      // this.currentSession$.next(this.currentSession);
      return
    }
   
    let dSet = this.currentSession.activities[activityIndex].sets[setIndex]
    this.setsToDelete.push(dSet);
    this.currentSession.activities[activityIndex].sets.splice(setIndex,1);
    return
  }

  clearDeletes() {
    this.setsToDelete.length = 0;
    this.activitiesToDelete.length =0;
    console.log("clearing Deletes")
  }

  //Creates a new blank session
  createBlankSession() {
    this.newSession = true;
    this.currentSession = new Session("", "workout " + this.getDayMonth());
    console.log("creating new", this.currentSession)
  }

  getMuscleGroups() {

  }

  //returns current day/month
  private getDayMonth(): string{
    return (this.date.getMonth() + 1) + "-" + this.date.getDate()
  }

}
