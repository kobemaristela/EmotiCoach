import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphVolumePage } from './graph-volume.page';

const routes: Routes = [
  {
    path: '',
    component: GraphVolumePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphVolumePageRoutingModule {}
