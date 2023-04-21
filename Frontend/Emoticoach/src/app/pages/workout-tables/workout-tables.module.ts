import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutTablesPageRoutingModule } from './workout-tables-routing.module';

import { WorkoutTablesPage } from './workout-tables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutTablesPageRoutingModule
  ],
  declarations: [WorkoutTablesPage]
})
export class WorkoutTablesPageModule {}
