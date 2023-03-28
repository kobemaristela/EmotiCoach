import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonInput } from '@ionic/angular';
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
  @Input() set:any;
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  setForm!: FormGroup;
  beingCreated = true;

  constructor(private service: SessionService) { 
  }

  ngOnInit() {
    if (this.set.reps == 0){
      this.set.reps = undefined;
    }
    if (this.set.weight == 0){
      this.set.weight = undefined;
    }
    if (this.set.rpe == 0){
      this.set.rpe = undefined;
    }


  }

}
