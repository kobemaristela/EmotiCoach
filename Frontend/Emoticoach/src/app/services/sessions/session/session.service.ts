import { Injectable } from '@angular/core';
import { session } from './Isession';
import { Session } from './Session';
import { activity } from '../activity/Iactivity';
import { set } from '../sets/Iset';
import { RequestSessionService } from './request-session.service';
import { sessionRequest } from './IsessionRequest';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Activity } from '../activity/Activity';
import { Set } from '../sets/Set';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  private currentSession: session;
  private newSession: boolean = false;
  private date:Date;
  private loading: boolean = true;
  private saving: boolean = false;
  constructor(private requestSessionService: RequestSessionService) { 
    this.date = new Date();
    this.currentSession = new Session("0","workout " + this.getDayMonth(), 0);
  }

  //returns a list of all sessions and does an api call to get them
  getSessions(): Observable<any> {
    return this.requestSessionService.getAllSessionsObservable();
  }
  
  //returns the current session secleted
  async getCurrentSession(): Promise<session> {
    if(this.loading){
     await this.delay(1000);
    }
    this.loading = true;
    return this.currentSession;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  //searches through all the sessions to find a session with a given id
  //api call to get the session data needs to be added
  loadSession(sessionID: number) { 
    this.requestSessionService.postGetSessionObservable(sessionID).subscribe( (data) => {
      this.currentSession = data;
      this.loading = false;
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
    this.saving = true;
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
    console.log("tosave",toSave)
    this.requestSessionService.postCreateNewSessionObservable(toSave);
  }

  saveExistingSession(toSave:session) {
    console.log("Saving Session", toSave);
    // this.requestSessionService.postSaveExistingSession(toSave.id, toSave.name, toSave.duration.toString(), toSave.datetime); 
    let saveActivities = toSave.activities;
    for (var i = 0; i < saveActivities.length; i++) {
      let currA = saveActivities[i];
      if (currA.id == "0"){
        console.log("creating activity", currA.sets[i])
        //set activity
        // this.requestSessionService.post(currA.id,currA.sets[i]);
      } else {
        console.log("saving activity", currA)
        this.requestSessionService.postSaveExistingActivity(currA.id,currA.name);
        for (var i = 0; i < currA.sets.length; i++) {
          if (currA.sets[i].id == 0){
            console.log("creating set", currA.sets[i])
            this.requestSessionService.postSetSet(currA.id,currA.sets[i]);
          } else {  
            console.log("saving set", currA.sets[i])
            this.requestSessionService.postSaveExistingSet(currA.sets[i]);
          }
          }
      }
    }
  }

  deleteSession(sessionId:number) {
    return this.requestSessionService.postDeleteSessionObservable(sessionId);
  }

  //Creates a new blank session
  createBlankSession() {
    this.newSession = true;
    console.log("creating new")
    this.currentSession = new Session("")
    this.currentSession.name = "workout " + this.getDayMonth();
  }

  //returns current day/month
  private getDayMonth(): string{
    return (this.date.getMonth() + 1) + "/" + this.date.getDate()
  }

}
