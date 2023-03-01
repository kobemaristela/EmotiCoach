import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphTweightPage } from './graph-tweight.page';

const routes: Routes = [
  {
    path: '',
    component: GraphTweightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphTweightPageRoutingModule {}
