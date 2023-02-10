import { Injectable } from '@angular/core';
import {session, activity, set} from './Isession.js'
import sessionsJson from './example_getWorkoutCall.json'

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessions: any[] = [];
  constructor() { 
    console.log(sessionsJson);
    this.sessions.push(sessionsJson)
  }

  loadSessions(userSessions: session[]){
    this.sessions = userSessions;
  }

  getSessions(userID: string): any[]{
    return this.sessions;
  }
}
