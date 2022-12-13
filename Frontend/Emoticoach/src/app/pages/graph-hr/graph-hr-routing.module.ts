import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphHrPage } from './graph-hr.page';

const routes: Routes = [
  {
    path: '',
    component: GraphHrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphHrPageRoutingModule {}
