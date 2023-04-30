import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.page.html',
  styleUrls: ['./change-avatar.page.scss'],
})
export class ChangeAvatarPage implements OnInit {
  icons: string[] = [];
  selectedAvatar:string = "Emotibit";
  @Output() dataFromChild:EventEmitter<string> = new EventEmitter<string>();

  constructor(public navCtrl: NavController) {
    this.icons = [
      "Emotibit",
      "shapes",
    ]
   }

  passToAccount(icon: string): void{
    this.dataFromChild.emit(icon)
   }

  returnCurrentAvatar(){
    return this.selectedAvatar;
   }

  ngOnInit() {
  }

}
