import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  headers: any;

  homepageCards: string[] = [
    'Log Workout', 
    'View RPE', 
    'Heart Rate',
    'Sleep and Water',
    'Tables'
  ];

  icons: string[] = [
    'barbell-outline',
    'walk-outline',
    'heart-outline',
    'water-outline',
    'analytics-outline'
  ];

  upperText: string[] = [
    'Log a new workout',
    'Rate of perceived effort',
    'Heart Rate',
    'Sleep and Water',
    'Tables'
  ];

  lowerText: string[] = [
    'Begin a new workout',
    'View your progress',
    'View your data',
    'View your data',
    'View your data'
  ];

  routing: string[] = [
    '/log-workout',
    '/graph-hr',
    '/log-workout',
    '/log-workout',
    '/log-workout',
  ];

  constructor(public navCtrl: NavController) {
  }

  ngOnInit() {
  }

  graphHR(){
    this.navCtrl.navigateForward('/graph-hr')
  }
  logWorkout(){
    this.navCtrl.navigateForward('/workouts-dashboard')
  }
  createCard(){
    
  }
}
