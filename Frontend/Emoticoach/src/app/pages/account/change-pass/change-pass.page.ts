import { Component, OnInit,  ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { user } from 'src/app/services/user/Iuser';
import { AccountService } from 'src/app/services/user/account.service';


@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss'],
})
export class ChangePassPage implements OnInit {

  userData = {
    new_pass: '',
    confirm_pass: ''
    }

  user: Observable<any>;
  user$: Observable<user>;
  matching: boolean;
  
  constructor(private accountService: AccountService, public navCtrl: NavController) {}

  ngOnInit(){
  }

  async changePassword(){
    if(this.userData.new_pass == this.userData.confirm_pass){
      this.matching = true;
      this.user$ = this.accountService.editAccountInfo("", "", "", this.userData.new_pass);
      this.user$.subscribe((res)=> {
        if(res){
          this.navCtrl.navigateForward('/tabs/account')
        }
      })
    }
    else{
      this.matching = false;
    }
  }
}
