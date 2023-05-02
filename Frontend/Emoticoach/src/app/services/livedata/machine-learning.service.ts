import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '../user/account.service';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineLearningService {

  constructor(private http: HttpClient, private accountService: AccountService) {

  }

  getOnFinger():Observable<any> {
   
    let tableParam = {
            headers: {
              "Authorization": "token " + this.accountService.returnUserToken(),
            }
      }

    let res = this.http.get<any>("https://emotidev.maristela.net/ml/onfinger",tableParam);
    // res.pipe(first()).subscribe(d=>{
    //   console.log(d)
    // });
    return res;
  }

  getTrain():Observable<any> {
   
    let tableParam = {
            // headers: {
            //   "Authorization": "token " + this.accountService.returnUserToken(),
            // }
      }

    let res = this.http.get<any>("https://emotidev.maristela.net/ml/parse",tableParam);
    // res.pipe(first()).subscribe(d=>{
    //   console.log(d)
    // });
    return res;
  }


  getArousal():Observable<any> {
   
    let tableParam = {
            headers: {
              "Authorization": "token " + this.accountService.returnUserToken(),
            }
      }

    let res = this.http.get<any>("https://emotidev.maristela.net/ml/arousal",tableParam);
    // res.pipe(first()).subscribe(d=>{
    //   console.log(d)
    // });
    return res;
  }


}
