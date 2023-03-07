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

  constructor(private servSession: SessionService) { }

  ngOnInit() {
    this.loadSets();
  }

  loadSets(){
    this.servSession.getCurrentSession()
    .subscribe(res => {
      this.activity = res.activities[this.activityIndex]
      // console.log(this.activity)
    });
  }

  addSet(){
    console.log("adding");
    this.servSession.addSet(this.activityIndex,this.activity.sets.length+1);
    this.activity.sets.push(new Set(0,this.activity.sets.length+1,0,0,0));
    
    // 
  }
  
  updateName(){
    this.servSession.updateActivity(this.activity, this.activityIndex);
    
  }
}
