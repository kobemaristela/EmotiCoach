import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GymSelectionPageRoutingModule } from './gym-selection-routing.module';

import { GymSelectionPage } from './gym-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GymSelectionPageRoutingModule
  ],
  declarations: [GymSelectionPage]
})
export class GymSelectionPageModule {}
