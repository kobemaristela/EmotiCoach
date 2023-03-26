import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphLivedataPage } from './graph-livedata.page';

const routes: Routes = [
  {
    path: '',
    component: GraphLivedataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphLivedataPageRoutingModule {}
