import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GymBuddyPage } from './gym-buddy.page';
const routes: Routes = [
  {
    path: '',
    component: GymBuddyPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GymBuddyPageRoutingModule {}
