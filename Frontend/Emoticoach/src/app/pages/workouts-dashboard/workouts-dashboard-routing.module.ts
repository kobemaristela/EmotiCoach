import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutsDashboardPage } from './workouts-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutsDashboardPageRoutingModule {}
