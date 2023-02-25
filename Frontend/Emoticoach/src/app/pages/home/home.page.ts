import { AfterContentChecked, Component, OnInit } from '@angular/core';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentChecked {

  workoutData: any[] = [];
  bannerConfig: SwiperOptions;
  featureConfig: SwiperOptions;
  features: any[] = [];

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
    '/login',
    '/log-workout',
    '/log-workout',
  ];

  constructor() { }

  ngOnInit() {
    this.workoutData = [
      { id: 1, workout_name: 'Bench', record: '185' },
      { id: 2, workout_name: 'Deadlift', record: '225' },
      { id: 3, workout_name: 'Squat', record: '275' }
    ];
  }

  ngAfterContentChecked() {
    this.bannerConfig = {
      slidesPerView: 1,
      pagination: { clickable: true }
    };
    this.featureConfig = {
      slidesPerView: 3.5,
    };
  }
}
