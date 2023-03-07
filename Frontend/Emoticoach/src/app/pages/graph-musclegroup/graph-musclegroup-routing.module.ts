import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphMusclegroupPage } from './graph-musclegroup.page';

const routes: Routes = [
  {
    path: '',
    component: GraphMusclegroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphMusclegroupPageRoutingModule {}
