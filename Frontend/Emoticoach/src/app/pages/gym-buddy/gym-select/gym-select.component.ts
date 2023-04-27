import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { IGym } from 'src/app/services/chat/IGymList';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-gym-select',
  templateUrl: './gym-select.component.html',
  styleUrls: ['./gym-select.component.scss'],
})
export class GymSelectComponent implements OnInit, AfterViewInit {
  @ViewChild('sliding', { read: ElementRef, static: true }) sliding: ElementRef;


  protected gymSelected: boolean = false;
  protected currentGym: IGym;
  protected gymList: IGym[] = [];
  msg: string = "";

  constructor(
    private chatService: ChatService,
    private animationCtrl: AnimationController,) { }


  ngAfterViewInit() {
    const slideAnimation = this.animationCtrl
      .create()
      .addElement(this.sliding.nativeElement)
      .duration(1000)
      .iterations(3)
      .keyframes([
        { offset: 0, transform: 'translateX(0px)' },
        { offset: 0.5, transform: 'translateX(10px)' },
        { offset: 1, transform: 'translateX(-2px)' }
      ])
      
    slideAnimation.play();
  }

  ngOnInit() {
    this.gymList = this.chatService.getGyms();
  }

  goToTopic(gym: IGym) {
    this.currentGym = gym
    this.gymSelected = true;
  }

  goBack() {
    this.gymSelected = false
  }
}
