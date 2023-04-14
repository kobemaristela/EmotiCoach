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

    let tableParam = {
      headers: {
        "Authorization": CHAD_TOKEN,
      }
  }
  let res = this.http.post<any>("https://emotidev.maristela.net/user/login", formData,tableParam);
    res.subscribe(data => {
      console.log("login data",data)
    })
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
        "Authorization": CHAD_TOKEN,
      }
  }
  let res = this.http.post<any>("https://emotidev.maristela.net/user/edit", formData,tableParam);
    return res;
  }
}
