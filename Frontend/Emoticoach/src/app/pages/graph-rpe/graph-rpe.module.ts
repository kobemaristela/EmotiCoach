import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphRpePageRoutingModule } from './graph-rpe-routing.module';

import { GraphRpePage } from './graph-rpe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphRpePageRoutingModule
  ],
  declarations: [GraphRpePage]
})
export class GraphRpePageModule {}
