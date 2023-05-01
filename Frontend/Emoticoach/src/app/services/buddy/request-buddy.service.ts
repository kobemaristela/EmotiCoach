import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '../user/account.service';
import { Observable, first } from 'rxjs';
import { friendRequest } from './IfriendsRequest';

@Injectable({
  providedIn: 'root'
})
export class RequestBuddyService {

  constructor(private http: HttpClient, private accountService: AccountService) { }

  addFriend(username: string) {
    const formData = new FormData();
    formData.append("username", username);

    let tableParam = {
      headers: {
        "Authorization": "token " + this.accountService.returnUserToken(),
      }
    }

    let res = this.http.post<any>("https://emotidev.maristela.net/buddy/addfriend", formData, tableParam);
    res.pipe(first()).subscribe(d=>{
      console.log(d)
    });
    return res;
  }

  getAllFriends(): Observable<friendRequest> {
    let tableParam = {
      headers: {
        "Authorization": "token " + this.accountService.returnUserToken(),
      }
    }

    let res = this.http.get<any>("https://emotidev.maristela.net/buddy/getallfriends", tableParam);
    res.pipe(first()).subscribe(d=>{
      console.log(d)
    });
    return res;
  }
}

