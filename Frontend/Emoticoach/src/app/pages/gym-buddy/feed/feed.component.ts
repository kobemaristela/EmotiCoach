import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { chat } from 'src/app/services/chat/IChat';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private content: IonContent;
  loaded = true;
  messageList$: Observable<chat[]>;
  chat: chat = {
    user_id: "User",
    muscleGroups: "",
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
        muscleGroups: "" + i * 2,
        time_sent: "2023-04-01T00:00:00",
        gym: "Planet Fitness" + i % 2,
        myMsg: i % 2 == 0
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
