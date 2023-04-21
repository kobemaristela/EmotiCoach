import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GymSelectionPage } from './gym-selection.page';

const routes: Routes = [
  {
    path: '',
    component: GymSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GymSelectionPageRoutingModule {}
