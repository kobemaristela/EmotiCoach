import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { friend } from './Ifriend';


@Injectable({
  providedIn: 'root'
})
export class BuddyService {
  friendsList$: BehaviorSubject<friend[]>;

  chad: friend = {username:"Chad", gym:"UNR", profilePicture:"fish"};
  jaemin: friend = { username:"Jaemin47", gym:"UNR", profilePicture:"fish"}
  friendList: friend[] = [this.chad, this.jaemin];
  constructor() { 
    this.friendsList$ = new BehaviorSubject<friend[]>(this.friendList);
  }

  getFriendList(): BehaviorSubject<friend[]> {
    // this.friendsList = http request
    return this.friendsList$
  }

  AddFriends(): void {
    this.friendsList$.next(this.friendList)
  }

  addFriend(userName: string) {

  }
  
}
