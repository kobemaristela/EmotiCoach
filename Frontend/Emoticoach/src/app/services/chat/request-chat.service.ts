import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    res.subscribe(data => {
      console.log("getChats", data)
    })
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
    res.subscribe(data => {
      console.log("setChats", data)
    })
    return res;
  }

}
