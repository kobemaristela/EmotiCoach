import { Injectable } from '@angular/core';
import { user } from './Iuser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CHAD_TOKEN } from 'src/environments/environment';
import { userInfo } from 'os';


@Injectable({
  providedIn: 'root'
})
export class RequestAccountService {

  constructor(private http: HttpClient) { }

  async getUserToken(username: string, password: string){
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
}
