import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphTrepsPageRoutingModule } from './graph-treps-routing.module';

import { GraphTrepsPage } from './graph-treps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphTrepsPageRoutingModule
  ],
  declarations: [GraphTrepsPage]
})
export class GraphTrepsPageModule {}
