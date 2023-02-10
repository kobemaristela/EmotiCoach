import { Injectable } from '@angular/core';
import {session, activity, set} from './Isession.js'
// import sessionsJson from './example_getWorkoutCall.json'

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessions: session[] = [];
  constructor() { 
    // console.log(sessionsJSON);
    
  }

  loadSessions(userSessions: session[]){
    this.sessions = userSessions;
  }

  getSessions(userID: string): session[]{
    return this.sessions;
  }
}
