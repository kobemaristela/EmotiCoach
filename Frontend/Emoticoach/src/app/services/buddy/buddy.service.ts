import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { friend } from './Ifriend';


@Injectable({
  providedIn: 'root'
})
export class BuddyService {
  friendsList$: BehaviorSubject<friend[]>;
  userName: string = "User_"
  chad: friend = {username:"Chad", gym:"UNR", profilePicture:"fish"};
  jaemin: friend = { username:"Jaemin47", gym:"American Iron", profilePicture:"fish"}
  friendList: friend[] = [this.chad, this.jaemin];
  gyms = ["UNR gym", "American Iron", "Planet Fitness"];
  currentGym: string = "";


  constructor() { 
    this.friendsList$ = new BehaviorSubject<friend[]>(this.friendList);
  }
  
  setCurrentGym(gym: string){
    this.currentGym = gym;
  }

  getFriendList(): BehaviorSubject<friend[]> {
    // this.friendsList = http request
    return this.friendsList$
  }

  AddFriends(): void {
    this.friendList.push({username:"User" + Math.round(Math.random()*10), gym:this.gyms[Math.floor(Math.random()*3)], profilePicture:"fish"})
    this.friendsList$.next(this.friendList)
  }

  addFriend(userName: string) {

  }
  
}
