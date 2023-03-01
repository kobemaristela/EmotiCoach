import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphRpePage } from './graph-rpe.page';

const routes: Routes = [
  {
    path: '',
    component: GraphRpePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphRpePageRoutingModule {}
