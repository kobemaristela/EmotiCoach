import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GymBuddyPageRoutingModule } from './gym-buddy-routing.module';

import { GymBuddyPage } from './gym-buddy.page';
import { FeedComponent } from './feed/feed.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GymSelectComponent } from './gym-select/gym-select.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapsModule,
    GymBuddyPageRoutingModule
  ],
  declarations: [GymBuddyPage, FeedComponent, FriendsListComponent, GymSelectComponent]
})
export class GymBuddyPageModule {}
