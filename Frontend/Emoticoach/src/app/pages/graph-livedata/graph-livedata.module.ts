import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphLivedataPageRoutingModule } from './graph-livedata-routing.module';

import { GraphLivedataPage } from './graph-livedata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphLivedataPageRoutingModule
  ],
  declarations: [GraphLivedataPage]
})
export class GraphLivedataPageModule {}
