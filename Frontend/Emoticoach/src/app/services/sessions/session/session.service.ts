import { Injectable } from '@angular/core';
import { session } from './Isession';
import { Session } from './Session';
import { activity } from '../activity/Iactivity';
import { set } from '../sets/Iset';
import { RequestSessionService } from './request-session.service';
import { sessionRequest } from './IsessionRequest';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  sessions: sessionRequest[] = [];
  currentSession: Observable<session>;
  currSession: session;
  newSession: boolean = false;
  date:Date;
  
  constructor(private requestSessionService: RequestSessionService) { 
    this.date = new Date();
    this.currentSession = new Observable((observer) =>{
      observer.next(new Session("0","workout " + this.getDayMonth()));
    });
  }

  //returns a list of all sessions and does an api call to get them
  getSessions(): Observable<any>{
    return this.requestSessionService.getAllSessionsObservable();
  }
  
  //returns the current session secleted
  getCurrentSession(): Observable<session>{
    return this.currentSession;
  }

  //searches through all the sessions to find a session with a given id
  //api call to get the session data needs to be added
  loadSession(sessionID: number){ 
    this.currentSession = this.requestSessionService.postGetSessionObservable(sessionID);
    this.currentSession.subscribe(data => this.currSession = data);
  }

  getSessionAPI(sessionID: number) {
    this.requestSessionService.postGetSessionObservable(sessionID)
  }

  //returns the activities of a given session
  getActivites(sessionID:number): activity[]{
    let activties:activity[] = []
    this.currentSession.subscribe(res => {activties = res.activities}) 
    return activties
  }

  //updates the set of a given activity
  updateSet(activityIndex: number, setIndex: number, newSet: set){
    // this.currentSession.activities[activityIndex].sets[setIndex] = newSet;
  }

  updateActivity(activity: activity, index: number){
    this.currentSession.pipe(
      map(
        d => d.activities[index] = activity
      ));
  }

  //saves session in the db when saved button is pressed
  //decieds if its a new save or an update to an existing entry
  saveSession(){
    if (this.newSession){
      console.log("saving new");
      // this.newSession = false;
      this.postCreateNewSession();
    }
    else {
      console.log("saving existing");
      this.postSaveExisting();
    }
  }

  //does a post request to update the table 
  async postCreateNewSession(){
    this.currentSession.subscribe(data => {
      this.requestSessionService.postCreateNewSessionObservable(data);
    });
  }

  async postSaveExisting(){
    
  }

  //Creates a new blank session
  createBlankSession(){
    this.newSession = true;
    console.log("creating new")
    this.currentSession
      .pipe(
        map(d => {
          "workout " + this.getDayMonth();
          return 
          }
        )
      );
  }

  //returns current day/month
  getDayMonth(): string{
    return (this.date.getMonth() + 1) + "/" + this.date.getDate()
  }

}
