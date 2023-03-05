import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ExerciseSetComponent } from './exercise-set/exercise-set.component';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { set } from 'src/app/services/sessions/sets/Iset';
import { Set } from 'src/app/services/sessions/sets/Set';
import { Activity } from 'src/app/services/sessions/activity/Activity';
import { activity } from 'src/app/services/sessions/activity/Iactivity';
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) 
  container!: ViewContainerRef
  @Input() activity: activity = new Activity("");
  @Input() activityIndex: number = 0;

  constructor(private service: SessionService) { }

  ngOnInit() {}
  addSet(){
    this.activity.sets.push(new Set());
  }
  updateName(){
    this.service.updateActivity(this.activity);
  }
}
