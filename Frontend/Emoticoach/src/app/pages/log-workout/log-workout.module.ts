import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogWorkoutPageRoutingModule } from './log-workout-routing.module';

import { LogWorkoutPage } from './log-workout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogWorkoutPageRoutingModule
  ],
  declarations: [LogWorkoutPage]
})
export class LogWorkoutPageModule {}
