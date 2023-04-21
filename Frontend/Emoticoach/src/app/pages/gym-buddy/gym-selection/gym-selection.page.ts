import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { BuddyService } from 'src/app/services/buddy/buddy.service';

@Component({
  selector: 'app-gym-selection',
  templateUrl: './gym-selection.page.html',
  styleUrls: ['./gym-selection.page.scss'],
})
export class GymSelectionPage implements OnInit {
  gyms: string[]  = ["UNR Gym"]

  constructor(private buddyService: BuddyService, public navCtrl: NavController) { }

  ngOnInit() {
  }

  loadGymChat(gym: string){
    this.buddyService.setCurrentGym(gym);
    this.navCtrl.navigateForward('/tabs/gym-buddy');
  }
}
