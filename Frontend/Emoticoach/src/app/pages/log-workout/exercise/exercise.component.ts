import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { Activity } from 'src/app/services/sessions/activity/Activity';
import { activity } from 'src/app/services/sessions/activity/Iactivity';
import { MUSCLE_LIST } from 'src/environments/environment';
import { muscleOptions } from '../../widgets/muscle-groups/muscle-svg/IOpacity-muscle';
import { set } from 'src/app/services/sessions/sets/Iset';
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})

export class ExerciseComponent implements OnInit {
  @Output() muscleSelected = new EventEmitter<number>();
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


  loadSets() {
    this.servSession.getCurrentSession();
  }

  deleteActivity() {
    console.log("deleting activty")
    this.servSession.deleteActivity(this.activityIndex);
  }

  addSet() {
    console.log("adding", this.activityIndex, this.activity.sets.length);
    this.servSession.addSet(this.activityIndex, this.activity.sets.length + 1);
    this.loadSets();
  }

  updateName() {
    const name: string = this.activity.name;
    const words: string[] = name.split(" ");
    
    for (let i = 0; i < words.length; i++) {
      if (words[i]){
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);

      }
    }
    
    this.activity.name = words.join(" ");

    this.servSession.updateActivity(this.activity, this.activityIndex);

  }
  addMuscles(event: muscleOptions[]) {
    this.activity.muscleGroups = event;
    this.muscleSelected.emit(1);
  }
}
