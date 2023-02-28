import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'log-workout',
    loadChildren: () => import('./pages/log-workout/log-workout.module').then( m => m.LogWorkoutPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'graph-hr',
    loadChildren: () => import('./pages/graph-hr/graph-hr.module').then( m => m.GraphHrPageModule)
  },
  {
    path: 'workouts-dashboard',
    loadChildren: () => import('./pages/workouts-dashboard/workouts-dashboard.module').then( m => m.WorkoutsDashboardPageModule)
  },
  {
    path: 'graph-onerm',
    loadChildren: () => import('./pages/graph-onerm/graph-onerm.module').then( m => m.GraphOnermPageModule)
  },
  {
    path: 'graph-treps',
    loadChildren: () => import('./pages/graph-treps/graph-treps.module').then( m => m.GraphTrepsPageModule)
  },
  {
    path: 'graph-tweight',
    loadChildren: () => import('./pages/graph-tweight/graph-tweight.module').then( m => m.GraphTweightPageModule)
  },
  {
    path: 'templates',
    loadChildren: () => import('./pages/templates/templates.module').then( m => m.TemplatesPageModule)
  },
  {
    path: 'graph-rpe',
    loadChildren: () => import('./pages/graph-rpe/graph-rpe.module').then( m => m.GraphRpePageModule)
  }

  


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
