import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chats$: BehaviorSubject<any>; 
  constructor() { 
    this.chats$ = new BehaviorSubject<any>(["hello"]); 
  }

  addChatMsg(): any {
    //send a chat tot he forumn
    
  }

}
