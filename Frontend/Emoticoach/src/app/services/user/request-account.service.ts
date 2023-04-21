import { Injectable } from '@angular/core';
import { user } from './Iuser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CHAD_TOKEN } from 'src/environments/environment';
import { userInfo } from 'os';
import { AccountService } from './account.service';


@Injectable({
  providedIn: 'root'
})
export class RequestAccountService {

  constructor(private http: HttpClient) { }

  getUserToken(username: string, password: string): Observable<any>{
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
  let res = this.http.post<any>("https://emotidev.maristela.net/user/login", formData);
    res.subscribe(data => {
      console.log("login data",data)
    })
    return res;
  }

  logout(): Observable<any>{
    let tableParam = {
     headers: {
       "Authorization": ("token " + AccountService.user_token),
     }
    }
    let res = this.http.get<any>("https://emotidev.maristela.net/user/logout", tableParam);
    return res;
  }

  deleteAccount(): Observable<any>{
    let tableParam = {
     headers: {
       "Authorization": ("token " + AccountService.user_token),
     }
    }
    let res = this.http.get<any>("https://emotidev.maristela.net/user/delete", tableParam);
    console.log(res)
    return res;
  }

  editAccountInfo(first_name:string, last_name:string, email:string, password:string):Observable<any>{
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);

    let tableParam = {
      headers: {
        "Authorization": ("token " + AccountService.user_token),
      }
  }
  let res = this.http.post<any>("https://emotidev.maristela.net/user/edit", formData,tableParam);
  res.subscribe(data => {
    console.log("edit respose",data)
  })
    return res;
  }
}
