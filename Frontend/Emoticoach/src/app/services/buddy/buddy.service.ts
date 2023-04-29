import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { friend } from './Ifriend';
import { RequestBuddyService } from './request-buddy.service';


@Injectable({
  providedIn: 'root'
})
export class BuddyService {
  protected friendsList$: BehaviorSubject<friend[]>;

  protected friendList: friend[] = [];


  constructor(private requestBuddyService:RequestBuddyService) { 
    this.friendsList$ = new BehaviorSubject<friend[]>(this.friendList);
    
  }
  

  getFriendList(): BehaviorSubject<friend[]> {
    this.requestBuddyService.getAllFriends().subscribe(d => {
      this.friendsList$.next(d.friends)
    });
    return this.friendsList$
  }

  addFriend(username: string):string {
   for(let i = 0; i < this.friendList.length; i++){
    if(username == this.friendList[i].username){
      return "Already Friends"
    }
   }
   this.requestBuddyService.addFriend(username);
   return "";
  }
  
}
