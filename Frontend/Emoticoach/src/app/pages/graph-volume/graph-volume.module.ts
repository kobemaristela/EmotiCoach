import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';

import { IonicModule } from '@ionic/angular';

import { GraphVolumePageRoutingModule } from './graph-volume-routing.module';

import { GraphVolumePage } from './graph-volume.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphVolumePageRoutingModule,
    NgxEchartsModule.forChild()
  ],
  declarations: [GraphVolumePage]
})
export class GraphVolumePageModule {}
