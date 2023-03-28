import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { Activity } from 'src/app/services/sessions/activity/Activity';
import { activity } from 'src/app/services/sessions/activity/Iactivity';
import { MUSCLE_LIST } from 'src/environments/environment';
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
  // @Output() delete: EventEmitter<any> = new EventEmitter();

  muscleList = MUSCLE_LIST;
  constructor(private servSession: SessionService) { }

  ngOnInit() {
    this.loadSets();
  }

  
  loadSets(){
    this.servSession.getCurrentSession()
  }

  addSet(){
    console.log("adding", this.activityIndex,this.activity.sets.length);
    this.servSession.addSet(this.activityIndex,this.activity.sets.length);
    this.loadSets();
  }
  
  updateName(){
    this.servSession.updateActivity(this.activity, this.activityIndex);
    
  }

  deleteSet(){
    this.servSession.deleteSet(this.activityIndex);
  }
}
