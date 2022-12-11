import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetricSelectionPageRoutingModule } from './metric-selection-routing.module';

import { MetricSelectionPage } from './metric-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetricSelectionPageRoutingModule
  ],
  declarations: [MetricSelectionPage]
})
export class MetricSelectionPageModule {}
