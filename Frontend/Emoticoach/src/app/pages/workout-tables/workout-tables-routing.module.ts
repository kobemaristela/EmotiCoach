import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutTablesPage } from './workout-tables.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutTablesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutTablesPageRoutingModule {}
