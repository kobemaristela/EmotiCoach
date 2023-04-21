import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { chat } from './IChat';
import { AccountService } from '../user/account.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chats$: BehaviorSubject<chat[]>; 
  private chats: chat[] = [{
    user_id: "ChadMcChad" , 
    time_sent: new Date().toISOString(), 
    myMsg: "Im going to hit bench today at 2pm",
    userSent: false
  }];
  alternate: boolean = false;

  constructor(private accountService: AccountService) { 
    this.chats$ = new BehaviorSubject<any>([]); 
    this.addChatMsg("Could you spot me? Im going to max out on bench today");

  }

  getChats$(): Observable<chat[]>{
    return this.chats$;
  }

  addChatMsg(msg: string): any {
    console.log(msg)
    this.alternate = !!!this.alternate;
    let newChat: chat = 
    {
      user_id: "Justin Fan" , 
      time_sent: new Date().toISOString(), 
      myMsg: msg,
      userSent: this.alternate
    }
    this.chats.push(newChat);
    this.chats$.next(this.chats)
  }

  
}
