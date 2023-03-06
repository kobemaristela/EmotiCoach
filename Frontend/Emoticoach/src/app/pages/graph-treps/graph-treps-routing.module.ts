import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphTrepsPage } from './graph-treps.page';

const routes: Routes = [
  {
    path: '',
    component: GraphTrepsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphTrepsPageRoutingModule {}
