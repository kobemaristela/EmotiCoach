import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemplateCreatorPageRoutingModule } from './template-creator-routing.module';

import { TemplateCreatorPage } from './template-creator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplateCreatorPageRoutingModule
  ],
  declarations: [TemplateCreatorPage]
})
export class TemplateCreatorPageModule {}
