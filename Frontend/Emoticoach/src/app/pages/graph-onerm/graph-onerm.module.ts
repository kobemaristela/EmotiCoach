import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';

import { IonicModule } from '@ionic/angular';

import { GraphOnermPageRoutingModule } from './graph-onerm-routing.module';

import { GraphOnermPage } from './graph-onerm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphOnermPageRoutingModule,
    NgxEchartsModule.forChild()
  ],
  declarations: [GraphOnermPage]
})
export class GraphOnermPageModule {}
