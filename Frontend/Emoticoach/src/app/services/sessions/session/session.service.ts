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
  sessions: sessionRequest[] = [];
  currentSession: Observable<session>;
  newSession: boolean = false;
  date:Date;
  
  constructor(private requestSessionService: RequestSessionService) { 
    this.date = new Date();
    this.currentSession = new Observable((observer) => {
      observer.next(new Session("0","workout " + this.getDayMonth()));
    });
  }

  //returns a list of all sessions and does an api call to get them
  getSessions(): Observable<any> {
    return this.requestSessionService.getAllSessionsObservable();
  }
  
  //returns the current session secleted
  getCurrentSession(): Observable<session> {
    return this.currentSession;
  }

  //searches through all the sessions to find a session with a given id
  //api call to get the session data needs to be added
  loadSession(sessionID: number) { 
    this.currentSession = this.requestSessionService.postGetSessionObservable(sessionID);
  }

  getSessionAPI(sessionID: number) {
    this.requestSessionService.postGetSessionObservable(sessionID)
  }

  //returns the activities of a given session
  getActivites(sessionID:number): activity[] {
    let activties:activity[] = []
    this.currentSession.subscribe(res => {activties = res.activities}) 
    return activties
  }

  addActivity() {
    this.currentSession = this.currentSession.pipe(
      map(
        d => { 
          d.activities.push(new Activity("0"))
          return d 
        }
      ));
  }

  updateActivity(activity: activity, index: number) {
    console.log("updating activity",activity)
    this.currentSession = this.currentSession.pipe(
      map(
        d => { 
          d.activities[index] = activity
          return d 
        }
      ));   
    this.currentSession.subscribe ( data => {
      console.log(data);
    })
  }

  addSet(activityIndex: number) {
    console.log("activity index",activityIndex)
    this.currentSession = this.currentSession.pipe(
      map(
        d => {
          let updateD = d
          updateD.activities[activityIndex].sets.push(new Set())
          return updateD
        }
      ));
  }
    //updates the set of a given activity
  updateSet(activityIndex: number, setIndex: number, newSet: set) {
    this.currentSession = this.currentSession.pipe(map(data => {
      data.activities[activityIndex].sets[setIndex] = newSet
      return data
    }));
    
  }

  updateDate(datetime:string) {
    this.currentSession = this.currentSession.pipe(map(data => {
      data.datetime = datetime
      return data
    }));
  }
  //saves session in the db when saved button is pressed
  //decieds if its a new save or an update to an existing entry
  saveSession() {
    if (this.newSession) {
      console.log("saving new");
      this.newSession = false;

      this.currentSession.subscribe( data => { 
        this.createNewSession(data);
      })
      
    }
    else {
      console.log("saving existing");
      this.currentSession.subscribe( data => { 
        this.saveExistingSession(data);
      })
      

    }
  }

  //does a post request to update the table 
  createNewSession(toSave:session) {
    console.log("tosave",toSave)
    this.requestSessionService.postCreateNewSessionObservable(toSave);
  }

  saveExistingSession(toSave:session) {
    console.log("Saving Session", toSave);
    this.requestSessionService.postSaveExistingSession(toSave.id, toSave.name, toSave.duration.toString(), toSave.datetime); 
    let saveActivities = toSave.activities;
  
    for (var i = 0; i < saveActivities.length; i++) {
      let currA = saveActivities[i];
      console.log("saving activity", currA)
      this.requestSessionService.postSaveExistingActivity(currA.id,currA.name);

      for (var i = 0; i < currA.sets.length; i++) {
        console.log("saving set", currA.sets[i])
        this.requestSessionService.postSaveExistingSet(currA.sets[i]);

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
    this.currentSession = this.currentSession
      .pipe(
        map(d => {
          d = new Session("")
          d.name = "workout " + this.getDayMonth();
          return d
          }
        )
      );
    return this.currentSession;
  }

  //returns current day/month
  getDayMonth(): string{
    return (this.date.getMonth() + 1) + "/" + this.date.getDate()
  }

}
