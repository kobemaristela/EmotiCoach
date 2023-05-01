import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IchatRequest, chat } from './IChat';
import { AccountService } from '../user/account.service';
import { IGym } from './IGymList';
import { LiveDataService } from '../livedata/live-data.service';
import { IMqttMessage } from 'ngx-mqtt';
import { RequestChatService } from './request-chat.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private gyms: IGym[] = [];
  private gymTopic: string = "";
  private chats$: BehaviorSubject<chat[]>; 
  private mqttTopics: Observable<any>;

  constructor(
    private accountService: AccountService, 
    private liveDataService: LiveDataService,
    private requestChatService: RequestChatService
    ) { 
    this.chats$ = new BehaviorSubject<any>([]); 

    this.loadGyms();
  }

  private loadGyms() {
    this.gyms = [{
      icon: "unr-wolf.svg",
      mqttTopic: "messages/gym/unr",
      name: "UNR Gym"
    },
    {
      icon: "pf-icon.svg",
      mqttTopic: "messages/gym/planet_fitness",
      name: "Planet Fitness"
    },
    {
      icon: "ai-icon.svg",
      mqttTopic: "messages/gym/american_iron",
      name: "American Iron"
    }];
  }

  loadTopic() {
    this.mqttTopics = this.liveDataService.observeTopic(this.gymTopic);
    this.mqttTopics.subscribe( (message: IMqttMessage) => {
      console.log("Payload Recived", message.payload.toString())
      if (message.payload.toString() == "new msg"){
        this.loadChats();
      }
    })
  }

  loadChats(): Observable<chat[]>{
    // this.requestChatService.getChats(this.gymTopic).subscribe( (v: IchatRequest) => {

    //   this.chats$.next(v.messages)
    // }
    // );
    return this.chats$;
  }

  getGyms(): IGym[] {
    return this.gyms;    
  }

  getGymTopic(): string {
    return this.gymTopic
  }

  setGymTopic(topic:string) {
    console.log(topic);
    this.gymTopic = topic;
    this.loadTopic();
  }

  addChatMsg(msg: string): any {
    this.requestChatService.setMessage(this.gymTopic, msg).subscribe( () => {
      this.liveDataService.publishToTopic(this.gymTopic, "new msg")
    });
   
  }

  
}
