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
      // {
      //   path: 'social',
      //   loadChildren: () => import('../pages/gym-buddy/gym-selection/gym-selection.module').then( m => m.GymSelectionPageModule)
      // },
      {
        path: 'social',
        loadChildren: () => import('../pages/gym-buddy/gym-buddy.module').then( m => m.GymBuddyPageModule)
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
        path: 'graph-livedata',
        loadChildren: () => import('../pages/graph-livedata/graph-livedata.module').then(m => m.GraphLivedataPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../pages/account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'templates',
        loadChildren: () => import('../pages/templates/templates.module').then( m => m.TemplatesPageModule)
      },
      {
        path: 'workout-tables',
        loadChildren: () => import('../pages/workout-tables/workout-tables.module').then( m => m.WorkoutTablesPageModule)
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
