import { Component, OnDestroy, OnInit } from '@angular/core';
import { data } from 'cypress/types/jquery';
import { Observable, Subscription } from 'rxjs';
import { friend } from 'src/app/services/buddy/Ifriend';
import { BuddyService } from 'src/app/services/buddy/buddy.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss'],
})
export class FriendsListComponent implements OnInit, OnDestroy {
  loaded = false;
  friendList$?: Observable<friend[]|undefined>;
  subscriberFriend: Subscription;
  friendList: friend[] = []
  searchList: friend[] = [];
  constructor(private servBuddy: BuddyService) { 
    
  }
  
  ngOnInit() {
    this.loaded = false;
    this.loadFriends();
    setTimeout(() => this.servBuddy.AddFriends(), 1000)


  }
  ngOnDestroy(): void {
    this.subscriberFriend.unsubscribe();
    this.loaded = false;
  }

  loadFriends() {
    this.loaded = false;
    this.friendList$ = this.servBuddy.getFriendList();
    this.subscriberFriend = this.friendList$?.subscribe( data => {
      if (data){
        this.loaded=true;
        this.friendList = data
        this.searchList = data
      }
    });
    
  }

  search(event:any) {
    const query = event.target.value.toLowerCase();
    this.searchList = this.friendList.filter(d => d.username.toLowerCase().indexOf(query) > -1);
    console.log(this.searchList)
  }

}
