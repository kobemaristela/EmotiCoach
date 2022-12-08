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
      title: 'Today',
      url: '/home',
      icon: 'calendar'
    },
    {
      title: 'Metrics',
      url: '/',
      icon: 'people'
    },
    {
      title: 'Map',
      url: '/',
      icon: 'map'
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
