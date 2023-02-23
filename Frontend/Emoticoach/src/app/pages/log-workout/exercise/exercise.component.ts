import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ExerciseSetComponent } from './exercise-set/exercise-set.component';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { set } from 'src/app/services/sessions/sets/Iset';
import { Set } from 'src/app/services/sessions/sets/Set';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  excerciseName : string = "Bench";
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef

  @Input() activityIndex: number = 0;
  @Input() activityName: string = "";
  @Input() sets: set[] = [];

  constructor(private service: SessionService) { }

  ngOnInit() {}
  addSet(){
    console.log(this.sets)
    this.sets.push(new Set());
  }
}
