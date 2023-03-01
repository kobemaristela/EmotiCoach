import { Injectable } from '@angular/core';
import sessionsJson from './example_getSessionsCall.json'
import { session } from './Isession';
import { Session } from './Session';
import { activity } from '../activity/Iactivity';
import { set } from '../sets/Iset';
import { RequestSessionService } from './request-session.service';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  sessions: session[] = [];
  currentSession: session;
  newSession: boolean = false;
  date:Date;
  
  constructor(private requestSessionService: RequestSessionService) { 
    this.sessions = sessionsJson
    this.requestSessionService.getAllSessions();

    this.date = new Date();
    this.currentSession = new Session("0", "workout " + this.getDayMonth());
   
  }

  //returns current day/month
  private getDayMonth(): string{
    return (this.date.getMonth() + 1) + "/" + this.date.getDate()
  }

  //saves session in the db when saved button is pressed
  //decieds if its a new save or an update to an existing entry
  saveSession(){
    if (this.newSession){
      console.log("saving new");
      this.sessions.unshift(this.currentSession);
      this.newSession = false;
      this.postCreateNewSession();
    }
    else {
      console.log("saving existing");
      this.postSaveExisting();
    }
  }

  //Sets the current session in thsi service to the passed in session
  updateCurrentSession(updatedSession: session){
    this.currentSession = updatedSession;
  }

  //Creates a new blank session
  createNewSession(){
    this.newSession = true;
    this.currentSession = new Session("0", "workout " + this.getDayMonth());
    console.log(this.currentSession);
    //Api call to create basic info 
  }

  //returns a list of all sessions and does an api call to get them
  getSessions(): session[]{
    
    return this.sessions;
  }
  
  //returns the current session secleted
  getCurrentSession(): session{
    return this.currentSession;
  }

  //searches through all the sessions to find a session with a given id
  //api call to get the session data needs to be added
  getSession(sessionID: string): session{ 
    for (var session of this.sessions) {
      if (session.id == sessionID){
        console.log("found session")
        return session
      }
    }
    console.log("session not found")
    return new Session("0");
  }

  //updates the current session to be a session in the sessions array
  setSession(index: number){
    this.currentSession = this.sessions[index];
    console.log("In set session \n current session is \n", this.currentSession)
  }

  //returns the activities of a given session
  getActivites(sessionID:string): activity[]{
    return this.getSession(sessionID).activities
  }

  //updates the set of a given activity
  updateSet(activityIndex: number, setIndex: number, newSet: set){
    this.currentSession.activities[activityIndex].sets[setIndex] = newSet;
    console.log(
      "setIndex\n",setIndex+"\n",
      "activty index \n" + activityIndex,
      this.currentSession.activities[activityIndex]
    )
  }
  
  //does a post request to update the table 
  async postCreateNewSession(){
    const res = await this.requestSessionService.postNewSession(this.currentSession);
    console.log(res);
    return res;
  }

  async postSaveExisting(){
    
  }

}
