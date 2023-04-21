import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { chat } from 'src/app/services/chat/IChat';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AccountService } from 'src/app/services/user/account.service';
import { MUSCLE_LIST } from 'src/environments/environment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private content: IonContent;
  loaded = true;

  messageList$: Observable<chat[]>;
  musscle: string[] = MUSCLE_LIST;
  userToken: string = "";


  constructor(private chatService: ChatService, private account: AccountService) {
    
  }

  ngOnInit() {
    this.userToken = this.account.returnUserToken();
   
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
    this.messageList$ = this.chatService.getChats$();
    this.messageList$
  }

  clicked() {
    console.log("click");
  }



}
