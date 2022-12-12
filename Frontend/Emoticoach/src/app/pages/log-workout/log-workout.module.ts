import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogWorkoutPageRoutingModule } from './log-workout-routing.module';
import { LogWorkoutPage } from './log-workout.page';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExerciseSetComponent } from './exercise/exercise-set/exercise-set.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogWorkoutPageRoutingModule,

  ],
  declarations: [
      LogWorkoutPage,
      ExerciseComponent, 
      ExerciseSetComponent
    ]
})
export class LogWorkoutPageModule {}
