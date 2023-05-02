import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { IchatRequest, chat } from './IChat';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../user/account.service';

@Injectable({
  providedIn: 'root'
})
export class RequestChatService {


  constructor(private http: HttpClient, private accountService: AccountService) { }


  getChats(topic: string): Observable<IchatRequest> {
    const formData = new FormData();
    formData.append("topic", topic)
    console.log("token", this.accountService.returnUserToken())
    let tableParam = {
      headers: {
        "Authorization": ("token " + this.accountService.returnUserToken()),
      }
    }
    let res = this.http.post<any>("https://emotidev.maristela.net/buddy/getmessagesforday", formData, tableParam);
    res.pipe(first()).subscribe(d=>{
      console.log(d)
    });
    return res;
  }

  setMessage(topic: string, message: string): Observable<any> {
    const formData = new FormData();
    formData.append("topic", topic)
    formData.append("message", message)


    let tableParam = {
      headers: {
        "Authorization": ("token " + this.accountService.returnUserToken()),
      }
    }
    let res = this.http.post<any>("https://emotidev.maristela.net/buddy/setmessage", formData, tableParam);
    return res;
  }

}
