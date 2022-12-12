import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetricSelectionPage } from './metric-selection.page';

const routes: Routes = [
  {
    path: '',
    component: MetricSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetricSelectionPageRoutingModule {}
