import { AlertController, NavController } from '@ionic/angular';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { RequestSessionService } from 'src/app/services/sessions/session/request-session.service';
// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentChecked {
  prVolume: string = "Log a Workout";
  prVolumeNum: number|string = "";

  headers: any;
  workoutData: any[] = [];
  bannerConfig: SwiperOptions;
  featureConfig: SwiperOptions;
  features: any[] = [];

  homepageCards: string[] = [
    // 'Rate of perceived effort', 
    // 'Templates',
    'Volume Data',
    'One Rep Max',
    'Muscle Group Data',
  ];

  icons: string[] = [
    // 'walk-outline',
    // 'folder-open-outline',
    'analytics-outline',
    'analytics-outline',
    'analytics-outline',
  ];

  upperText: string[] = [
    // 'Rate of perceived effort', 
    // 'Templates',
    'Volume Data',
    'One Rep Max',
    'Muscle Group Data',
  ];

  lowerText: string[] = [
    // 'View your progress',
    // 'Create a workout template',
    'View volume data from your workouts',
    'View your one rep max data from your workouts',
    'View your muscle group data from workouts',
  ];

  routing: string[] = [
    // '/graph-rpe',
    // '/tabs/templates',
    '/tabs/graph-volume',
    '/tabs/graph-onerm',
    '/tabs/graph-musclegroup',
  ];

  constructor(
    public navCtrl: NavController, 
    private alertController: AlertController,
    private requestSessions: RequestSessionService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.loadPr();
    }, 2000);
   
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'New PR',
      message: 'You hit 225 on Bench for the first time!',
      buttons: ['Congrats!'],
    });

    await alert.present();
  }

  loadPr() {
    this.requestSessions.postGetActivityTable(1, 7).subscribe(data => {
      console.log(data)
      if (data.table.length > 0) {

      
      const max = data.table.reduce(function(prev, current) {
        return (prev.heaviest_weight > current.heaviest_weight) ? prev : current
      })
      this.prVolume = max.activity + " Heaviest Weight";
      this.prVolumeNum = max.heaviest_weight + " lbs";
    } else {
      this.prVolume = "Log a Workout";
      this.prVolumeNum = "";
    }
    })
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
