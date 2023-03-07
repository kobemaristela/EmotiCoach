import { Component } from '@angular/core';
import { LiveDataService } from './services/livedata/live-data.service';
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
      title: 'Logs',
      url: '/workouts-dashboard',
      icon: 'reader'
    },
    {
      title: 'About',
      url: '/',
      icon: 'information-circle'
    }
  ];
  loggedIn = false;

  constructor(private liveDataService: LiveDataService) {
    console.log("creating livedata service");
    // this.liveDataService.connectToBroker();
    // this.liveDataService.closeConnection();
  }
  logout(){}
}
