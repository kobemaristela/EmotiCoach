import { AlertController, NavController } from '@ionic/angular';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
import { ThemeService } from 'src/app/services/theme/theme.service';
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
    // 'Rate of perceived effort', 
    'Templates',
    'Volume Data',
    'One Rep Max',
    'Muscle Group Data',
    'Live Data Graph'
  ];

  icons: string[] = [
    // 'walk-outline',
    'folder-open-outline',
    'folder-outline',
    'analytics-outline',
    'analytics-outline',
    'analytics-outline'
  ];

  upperText: string[] = [
    // 'Rate of perceived effort', 
    'Templates',
    'Volume Data',
    'One Rep Max',
    'Muscle Group Data',
    'Live Data Graph'
  ];

  lowerText: string[] = [
    // 'View your progress',
    'Create a workout template',
    'View volume data from your workouts',
    'View your one rep max data from your workouts',
    'View your muscle group data from workouts',
    'View live data from your Emotibit'
  ];

  routing: string[] = [
    // '/graph-rpe',
    '/tabs/templates',
    '/tabs/graph-volume',
    '/tabs/graph-onerm',
    '/tabs/graph-musclegroup',
    '/tabs/graph-livedata'
  ];

  constructor(public navCtrl: NavController, private alertController: AlertController) {
  }

  ngOnInit() {
    this.workoutData = [
      { id: 1, workout_name: 'Bench', record: '185' },
      { id: 2, workout_name: 'Deadlift', record: '225' },
      { id: 3, workout_name: 'Squat', record: '275' },
    ];

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'New PR',
      message: 'You hit 225 on Bench for the first time!',
      buttons: ['Congrats!'],
    });

    await alert.present();
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
