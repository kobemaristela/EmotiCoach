import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphMusclegroupPageRoutingModule } from './graph-musclegroup-routing.module';

import { GraphMusclegroupPage } from './graph-musclegroup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphMusclegroupPageRoutingModule
  ],
  declarations: [GraphMusclegroupPage]
})
export class GraphMusclegroupPageModule {}
