import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphHrPageRoutingModule } from './graph-hr-routing.module';

import { GraphHrPage } from './graph-hr.page';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphHrPageRoutingModule,
    NgChartsModule
  ],
  declarations: [GraphHrPage]
})
export class GraphHrPageModule {}
