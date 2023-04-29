import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { chat } from 'src/app/services/chat/IChat';
import { IGym } from 'src/app/services/chat/IGymList';
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
  @Input() currentGym: IGym;
  
  messageList$: Observable<chat[]>;
  userToken: string = "";


  constructor(private chatService: ChatService, private account: AccountService) {
    
  }

  ngOnInit() {
    this.userToken = this.account.returnUserToken();
    console.log("loaded")
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
    this.messageList$ = this.chatService.loadChats();
  }

  clicked() {
    console.log("click");
  }



}
