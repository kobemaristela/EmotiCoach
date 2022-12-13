import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutsDashboardPageRoutingModule } from './workouts-dashboard-routing.module';

import { WorkoutsDashboardPage } from './workouts-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutsDashboardPageRoutingModule
  ],
  declarations: [WorkoutsDashboardPage]
})
export class WorkoutsDashboardPageModule {}
