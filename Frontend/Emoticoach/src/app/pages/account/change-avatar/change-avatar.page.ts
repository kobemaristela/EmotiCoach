import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NavController } from '@ionic/angular';
import { RequestAccountService } from 'src/app/services/user/request-account.service';
import { IconRequest } from './IIconRequest';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.page.html',
  styleUrls: ['./change-avatar.page.scss'],
})
export class ChangeAvatarPage implements OnInit {
  icons: IconRequest[] = [];
  selectedAvatar:string = "Emotibit";
  @Output() dataFromChild:EventEmitter<IconRequest> = new EventEmitter<IconRequest>();

  constructor(public navCtrl: NavController, private requestAccountService: RequestAccountService) {
   }

  passToAccount(icon: IconRequest): void{
    this.dataFromChild.emit(icon)
   }

   getIconList(){
    this.requestAccountService.getUserIcons().subscribe(data => {
      this.icons = data.icons;
      console.log(data)
    });
   }

  returnCurrentAvatar(){
    return this.selectedAvatar;
   }

  ngOnInit() {
    this.getIconList();
  }

}
