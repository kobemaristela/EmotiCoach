import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphTweightPageRoutingModule } from './graph-tweight-routing.module';

import { GraphTweightPage } from './graph-tweight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphTweightPageRoutingModule
  ],
  declarations: [GraphTweightPage]
})
export class GraphTweightPageModule {}
