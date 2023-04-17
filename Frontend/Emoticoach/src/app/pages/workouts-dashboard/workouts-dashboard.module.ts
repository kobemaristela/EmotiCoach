import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutsDashboardPageRoutingModule } from './workouts-dashboard-routing.module';

import { WorkoutsDashboardPage } from './workouts-dashboard.page';
import { ComponentsModule } from 'src/app/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutsDashboardPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WorkoutsDashboardPage]
})
export class WorkoutsDashboardPageModule {}
