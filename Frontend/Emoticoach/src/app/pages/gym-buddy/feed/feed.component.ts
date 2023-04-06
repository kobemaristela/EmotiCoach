import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { chat } from 'src/app/services/chat/IChat';
import { MUSCLE_LIST } from 'src/environments/environment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private content: IonContent;
  loaded = true;
  gyms = ["UNR", "American Iron", "Planet Fitness"];
  messageList$: Observable<chat[]>;
  musscle: string[] = MUSCLE_LIST;
  chat: chat = {
    user_id: "User",
    muscleGroups: "s",
    time_sent: "2023-04-01T00:00:00",
    gym: "Planet Fitness",
    myMsg: false
  }

  constructor() {
    this.messageList$ = new Observable<chat[]>(data => data.next(
      [this.chat]
    ));
  }

  ngOnInit() {
    this.loadMsgs();
    // this.scrollToBottomOnInit();
  }
  ngAfterViewChecked() {        
    this.content.scrollToBottom(300);
  }  
  scrollToBottomOnInit() {
    this.content.scrollToBottom(300);
  }

  loadMsgs() {
    let msgList: any = [];

    for (let i = 0; i < 10; i++) {
      this.chat = {
        user_id: "User" + i,
        muscleGroups: this.musscle[Math.floor(Math.random() * 7)] , 
        time_sent: "2023-04-01T00:00:00",
        gym: this.gyms[i%3],
        myMsg: i % 4 == 0
      }
      msgList.push(this.chat);
    }
    this.messageList$ = new Observable<chat[]>(data => data.next(
      msgList
    ));

  }
  clicked() {
    console.log("click");
  }


}
