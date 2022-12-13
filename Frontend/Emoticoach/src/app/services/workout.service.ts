import { Injectable } from '@angular/core';
import { workOut, exercise, set } from './Iworkout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService{
  currentWorkoutOut: workOut; 
  
  constructor() { 
    this.currentWorkoutOut = {
        name: "",
        date: null, 
        exercises: []
      };
  }

  set workOutName(workoutName: string){
    this.currentWorkoutOut.name = workoutName;
  }

  

}
