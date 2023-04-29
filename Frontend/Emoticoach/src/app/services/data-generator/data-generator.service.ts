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
    console.log(session);
    this.requestSessionService.postCreateNewSessionObservable(session).subscribe(
      data => console.log(data)
    );
  }

  generateSessions() {

    let lastYear: Date = new Date();
    lastYear.setMonth(lastYear.getMonth());

    for (let d = 0; d < 18; d++) {
      let newSession: session = new Session('0');
      let mod = d % 6;
      if ((d % 7) == 0) {
        for (let i = 0; i < this.activites.length; i++) {
          for (let a = 0; a < this.activites[i].length; a++) {
            for (let s = 0; s < this.activites[i][a].sets.length; s++) {
              if (this.activites[i][a].sets[s].weight != 0) {
                this.activites[i][a].sets[s].weight = this.activites[i][a].sets[s].weight + 25;

              } else {
                this.activites[i][a].sets[s].reps = this.activites[i][a].sets[s].reps + 3;

              }

            }

          }
        }

      }


      newSession.name = this.days[mod];
      newSession.activities = this.activites[mod];

      var offset = lastYear.getTimezoneOffset() / 60;
      var indexOfDot = lastYear.toISOString().split('.')[0]
      lastYear.toISOString()
      console.log(indexOfDot)

      newSession.datetime = indexOfDot + "-0" + offset + ":00"

      newSession.duration = Math.floor((Math.random() * 20) + 50);

      setTimeout(() => { this.createSession(newSession) }, 10000)

      "2023-04-13T21:36:00Z"
      lastYear.setDate(lastYear.getDate() + 1);
    }


  }
  runScript() {
    this.generateSessions();
  }
}
