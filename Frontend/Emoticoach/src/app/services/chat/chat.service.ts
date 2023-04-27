import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { chat } from './IChat';
import { AccountService } from '../user/account.service';
import { IGym } from './IGymList';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private gyms: IGym[] = [];
  private gymTopic: string = "";
  private chats$: BehaviorSubject<chat[]>; 
  private chats: chat[] = [];

  constructor(private accountService: AccountService) { 
    this.chats$ = new BehaviorSubject<any>([{user_id: "ChadMcChad" , time_sent: new Date().toISOString(), myMsg: "Im going to hit bench today at 2pm", userSent: false}]); 
    this.addChatMsg("Could you spot me? Im going to max out on bench today");
    this.chats.push({user_id: "ChadMcChad" , time_sent: new Date().toISOString(), myMsg: "Yeah I can",userSent: false})
    this.loadGyms();
  }

  private loadGyms() {
    this.gyms = [{
      icon: "unr-wolf.svg",
      mqttTopic: "/gym/unr",
      name: "UNR Gym"
    },
    {
      icon: "pf-icon.svg",
      mqttTopic: "/gym/planet_fitness",
      name: "Planet Fitness"
    },
    {
      icon: "ai-icon.svg",
      mqttTopic: "/gym/american_iron",
      name: "American Iron"
    }];
  }

  getGyms(): IGym[] {
    return this.gyms;    
  }

  getChats$(): Observable<chat[]>{
    return this.chats$;
  }

  getGymTopic(): string {
    return this.gymTopic
  }

  setGymTopic(topic:string) {
    this.gymTopic = topic;
  }

  addChatMsg(msg: string): any {
    console.log(msg)
    let newChat: chat = 
    {
      user_id: "Justin Fan" , 
      time_sent: new Date().toISOString(), 
      myMsg: msg,
      userSent: true
    }
    this.chats.push(newChat);
    this.chats$.next(this.chats)
  }

  
}
