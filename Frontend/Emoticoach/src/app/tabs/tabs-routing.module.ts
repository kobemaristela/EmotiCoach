import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'log',
        loadChildren: () => import('../pages/workouts-dashboard/workouts-dashboard.module').then(m => m.WorkoutsDashboardPageModule)
      },
      {
        path: 'sync',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'graph-onerm',
        loadChildren: () => import('../pages/graph-onerm/graph-onerm.module').then(m => m.GraphOnermPageModule)
      },
      {
        path: 'graph-volume',
        loadChildren: () => import('../pages/graph-volume/graph-volume.module').then(m => m.GraphVolumePageModule)
      },
      {
        path: 'graph-musclegroup',
        loadChildren: () => import('../pages/graph-musclegroup/graph-musclegroup.module').then(m => m.GraphMusclegroupPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
