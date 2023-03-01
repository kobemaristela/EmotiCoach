import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphOnermPage } from './graph-onerm.page';

const routes: Routes = [
  {
    path: '',
    component: GraphOnermPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphOnermPageRoutingModule {}
