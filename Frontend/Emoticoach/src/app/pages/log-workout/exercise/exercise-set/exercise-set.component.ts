import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SessionService } from 'src/app/services/sessions/session/session.service';
import { set } from 'src/app/services/sessions/sets/Iset';

@Component({
  selector: 'app-exercise-set',
  templateUrl: './exercise-set.component.html',
  styleUrls: ['./exercise-set.component.scss'],
})
export class ExerciseSetComponent implements OnInit {

  @Input() activityIndex: number = 0;
  @Input() setCount: number = 0;
  @Input() set: set;
  setForm!: FormGroup;
  beingCreated = true;

  constructor(private service: SessionService) { 
  }

  ngOnInit() {
    //load set here given session and activty index
    // if(this.beingCreated){
    //   this.loadSet();
    // }

   
  }

  loadSet() {
      // this.service.getCurrentSession()
      // .subscribe(res => {
      //   console.log(this.set)
      //   this.set = res.activities[this.activityIndex].sets[this.setCount-1]
      // });
  }

  setChanges() {
    // if (!this.beingCreated){
    //   console.log("updating set", this.set);
    //   this.service.updateSet(this.activityIndex, this.setCount - 1, this.set);
    // }
  }
}
