import { Injectable } from '@angular/core';
import { RequestSessionService } from '../sessions/session/request-session.service';
import { Session } from '../sessions/session/Session';
import { session } from '../sessions/session/Isession';
import { activity } from '../sessions/activity/Iactivity';
import { Activity } from '../sessions/activity/Activity';
import { Set } from '../sessions/sets/Set';

@Injectable({
  providedIn: 'root'
})
export class DataGeneratorService {
  sessions: session[] = [];
  days: string[] = ["Leg Day 1", "Push Day 1", "Pull Day 1", "Leg Day 2", "Push Day 2", "Pull Day 2"];

  activites: activity[][] =
    [
      [
        new Activity('0', "Squat", ["calve", "hamstring", "quadricep", "glute"], [
          new Set(0, 1, 135, 8, 8),
          new Set(0, 2, 135, 8, 8),
          new Set(0, 3, 135, 8, 9),
          new Set(0, 4, 135, 8, 9),
        ]),
        new Activity('0', "Leg Extensions", ["quadricep"], [
          new Set(0, 1, 90, 10, 8),
          new Set(0, 2, 90, 10, 8),
          new Set(0, 3, 90, 10, 9),
        ]),
        new Activity('0', "Hamstring Curls", ["hamstring", "glute"], [
          new Set(0, 1, 90, 10, 8),
          new Set(0, 2, 90, 10, 8),
          new Set(0, 3, 90, 10, 9),
        ])
      ],
      [
        new Activity('0', "Bench Press", ["chest", "tricep"], [
          new Set(0, 1, 90, 8, 8),
          new Set(0, 2, 90, 8, 8),
          new Set(0, 3, 90, 8, 9),
          new Set(0, 4, 90, 8, 9),
        ]),
        new Activity('0', "Military Press", ["shoulder"], [
          new Set(0, 1, 65, 8, 8),
          new Set(0, 2, 65, 8, 8),
          new Set(0, 3, 65, 8, 9),
        ]),
        new Activity('0', "Rope Pull Downs", ["tricep"], [
          new Set(0, 1, 20, 10, 8),
          new Set(0, 2, 20, 10, 8),
          new Set(0, 3, 20, 10, 8),
        ])
      ],
      [
        new Activity('0', "Pull Ups", ["lower_back", "upper_back"], [
          new Set(0, 1, 0, 4, 8),
          new Set(0, 2, 0, 3, 8),
          new Set(0, 3, 0, 3, 10),
        ]),
        new Activity('0', "Lat Raises", ["shoulder"], [
          new Set(0, 1, 10, 12, 8),
          new Set(0, 2, 10, 12, 8),
          new Set(0, 3, 10, 12, 9),
        ]),
        new Activity('0', "Hammer Curls", ["bicep"], [
          new Set(0, 1, 15, 10, 8),
          new Set(0, 2, 15, 10, 8),
          new Set(0, 3, 15, 10, 9),
        ])
      ],
      [
        new Activity('0', "Leg Press", ["calve", "hamstring", "quadricep", "glute"], [
          new Set(0, 1, 90, 8, 8),
          new Set(0, 2, 90, 8, 8),
          new Set(0, 3, 90, 8, 9),
          new Set(0, 4, 90, 8, 9),
        ]),
        new Activity('0', "Leg Extensions", ["quadricep"], [
          new Set(0, 1, 90, 10, 8),
          new Set(0, 2, 90, 10, 8),
          new Set(0, 3, 90, 10, 9),
        ]),
        new Activity('0', "Hamstring Curls", ["hamstring", "glute"], [
          new Set(0, 1, 90, 10, 8),
          new Set(0, 2, 90, 10, 8),
          new Set(0, 3, 90, 10, 9),
        ])
      ],
      [
        new Activity('0', "Dumbell Bench Press", ["chest", "tricep"], [
          new Set(0, 1, 35, 8, 8),
          new Set(0, 2, 35, 8, 8),
          new Set(0, 3, 35, 8, 9),
          new Set(0, 4, 35, 8, 9),
        ]),
        new Activity('0', "Shoulder Press", ["shoulder"], [
          new Set(0, 1, 25, 8, 8),
          new Set(0, 2, 25, 8, 8),
          new Set(0, 3, 25, 8, 9),

        ]),
        new Activity('0', "Rope Pull Downs", ["tricep"], [
          new Set(0, 1, 20, 10, 8),
          new Set(0, 2, 20, 10, 8),
          new Set(0, 3, 20, 10, 8),
        ])
      ],
      [
        new Activity('0', "Pull Downs", ["lower_back", "upper_back"], [
          new Set(0, 1, 90, 8, 8),
          new Set(0, 2, 90, 8, 8),
          new Set(0, 3, 90, 8, 9),
          new Set(0, 4, 90, 8, 9),
        ]),
        new Activity('0', "Barbell Row", ["lower_back"], [
          new Set(0, 1, 90, 8, 8),
          new Set(0, 2, 90, 8, 8),
          new Set(0, 3, 90, 8, 9),
          new Set(0, 4, 90, 8, 9),
        ]),
        new Activity('0', "Bicep Curls", ["bicep"], [
          new Set(0, 1, 15, 10, 8),
          new Set(0, 2, 15, 10, 8),
          new Set(0, 3, 15, 10, 9),
        ])
      ]
    ];
  constructor(private requestSessionService: RequestSessionService) { }

  createSession(session: session) {

    this.requestSessionService.postCreateNewSessionObservable(session)
  }

  generateSessions() {
    let newSession: session = new Session('0');
    let activity: activity = new Activity('0');
    let lastYear:Date = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 2);
    console.log(lastYear.toDateString())

    newSession.datetime = lastYear.toUTCString();
    newSession.name = this.days[0];
    newSession.activities = this.activites[0];
    newSession.duration = Math.floor((Math.random() * 20) + 50)

    console.log(newSession)
    for (let d = 1; d <= 365; d++){
      for (let i = 0; i < this.days.length; i++) {
       
        console.log( newSession.datetime);

      }
      lastYear.setDate(lastYear.getDate() + 1);
    }
 

  }
  runScript() {
    this.generateSessions();
  }
}
