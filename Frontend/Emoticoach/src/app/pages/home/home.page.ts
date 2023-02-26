import { NavController } from '@ionic/angular';
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

  headers: any;
  workoutData: any[] = [];
  bannerConfig: SwiperOptions;
  featureConfig: SwiperOptions;
  features: any[] = [];

  homepageCards: string[] = [
    'Rate of perceived effort', 
    'Templates', 
    'Total Weight',
    'One Rep Max',
    'Total Reps'
  ];

  icons: string[] = [
    'walk-outline',
    'folder-open-outline',
    'analytics-outline',
    'analytics-outline',
    'analytics-outline'
  ];

  upperText: string[] = [
    'Rate of perceived effort', 
    'Templates', 
    'Total Weight',
    'One Rep Max',
    'Total Reps'
  ];

  lowerText: string[] = [
    'View your progress',
    'Create a workout template',
    'View total weight lifted on one day for each workout completed',
    'View your one rep max on one day for each workout completed',
    'View total reps completed on one day for each workout completed'
  ];

  routing: string[] = [
    '/log-workout',
    '/graph-hr',
    '/login',
    '/log-workout',
    '/log-workout',
  ];

    constructor(public navCtrl: NavController) {
  }

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
