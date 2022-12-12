import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-set',
  templateUrl: './exercise-set.component.html',
  styleUrls: ['./exercise-set.component.scss'],
})
export class ExerciseSetComponent implements OnInit {
  setCount: number = 1;
  set : string = 'Set ' + this.setCount;
  constructor() { }

  ngOnInit() {}

}
