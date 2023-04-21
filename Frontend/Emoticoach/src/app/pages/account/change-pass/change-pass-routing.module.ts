import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePassPage } from './change-pass.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePassPageRoutingModule {}
