import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateCreatorPage } from './template-creator.page';

const routes: Routes = [
  {
    path: '',
    component: TemplateCreatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateCreatorPageRoutingModule {}
