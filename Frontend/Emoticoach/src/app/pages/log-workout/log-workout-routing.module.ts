import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogWorkoutPage } from './log-workout.page';

const routes: Routes = [
  {
    path: '',
    component: LogWorkoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogWorkoutPageRoutingModule {}
