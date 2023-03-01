import { Component, Input, OnInit, Output } from '@angular/core';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { set } from 'src/app/services/sessions/sets/Iset';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-exercise-set',
  templateUrl: './exercise-set.component.html',
  styleUrls: ['./exercise-set.component.scss'],
})
export class ExerciseSetComponent implements OnInit {

  @Input() activityIndex: number = 0;
  @Input() setCount: number = 0;
  @Input()  set: set;

  constructor(private service: SessionService) { 
    this.set = {
      set_num: 0,
      weight: 0,
      reps: 0,
      rpe: 0
    }
  }

  ngOnInit() {
    this.set.set_num = this.setCount - 1;
  }

  updateSet() {
    this.service.updateSet(this.activityIndex, this.setCount - 1, this.set);
  }
}
