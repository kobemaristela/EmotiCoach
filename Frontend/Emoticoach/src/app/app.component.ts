import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  //list of pages
  appPages = [
    {
      title: 'Dashboard',
      url: '/home',
      icon: 'calendar'
    },
    {
      title: 'Metrics',
      url: '/metric-selection',
      icon: 'people'
    },
    {
      title: 'Log Workout',
      url: '/log-workout',
      icon: 'reader'
    },
    {
      title: 'About',
      url: '/',
      icon: 'information-circle'
    }
  ];
  loggedIn = false;

  constructor() {}
  logout(){}
}
