import { Injectable } from '@angular/core';
import sessionsJson from './example_getSessionsCall.json'
import { session } from './Isession';
import { Session } from './Session';
import { activity } from '../activity/Iactivity';
import { set } from '../sets/Iset';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  sessions: session[] = [];
  currentSession: session;
  newSession: boolean = false;
  date:Date;
  
  constructor() { 
    this.sessions = sessionsJson
    this.date = new Date();
    this.currentSession = new Session("0", "workout " + this.getDayMonth());
   
  }

  private getDayMonth(): string{
    return (this.date.getMonth() + 1) + "/" + this.date.getDate()
  }

  saveSession(){
    if (this.newSession){
      console.log("saving")
      this.sessions.unshift(this.currentSession);
      this.newSession = false;
    }
  }
  updateCurrentSession(updatedSession: session){
    this.currentSession = updatedSession;
  }

  createNewSession(){
    this.newSession = true;
    this.currentSession = new Session("0", "workout " + this.getDayMonth());
    console.log(this.currentSession);
    //Api call to create basic info 
  }

  getSessions(): session[]{
    return this.sessions;
  }
  
  getCurrentSession(): session{
    return this.currentSession;
  }

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

  setSession(index: number){
    this.currentSession = this.sessions[index];
    console.log("In set session \n current session is \n", this.currentSession)
  }

  getActivites(sessionID:string): activity[]{
    return this.getSession(sessionID).activities
  }

  updateSet(activityIndex: number, setIndex: number, newSet: set){
    this.currentSession.activities[activityIndex].sets[setIndex] = newSet;
    console.log(
      "setIndex\n",setIndex+"\n",
      "activty index \n" + activityIndex,
      this.currentSession.activities[activityIndex]
    )
  }
  



}
