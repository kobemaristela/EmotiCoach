import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphOnermPageRoutingModule } from './graph-onerm-routing.module';

import { GraphOnermPage } from './graph-onerm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphOnermPageRoutingModule
  ],
  declarations: [GraphOnermPage]
})
export class GraphOnermPageModule {}
