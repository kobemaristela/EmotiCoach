import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../user/account.service';
import { Observable } from 'rxjs';
import { userInfo } from 'os';


@Injectable({
  providedIn: 'root'
})
export class RequestGraphService {

  constructor(private http: HttpClient, private accountService: AccountService) { }

getVolumeData(start_date: string, activity: string){
    const formData = new FormData();
    formData.append("start_date", start_date); //format 2023-03-07
    formData.append("length", "7");
    formData.append("activity", activity);

    let tableParam = {
      headers: {
        "Authorization": "token " + this.accountService.returnUserToken(),
      }
    }

    let result = this.http.post<any>("https://emotidev.maristela.net/graph/getvolumedata", formData, tableParam)
    return result;
  }

  getMuscleGroups(week_num: string){
    const formData = new FormData();
    formData.append("week_num", week_num);

    let tableParam = {
      headers: {
        "Authorization": "token " + this.accountService.returnUserToken(),
      }
    }

    let result = this.http.post<any>("https://emotidev.maristela.net/graph/getmusclegroupdata", formData, tableParam)
    return result;
  }

  getWorkoutNames(){
    let tableParam = {
      headers: {
        "Authorization": "token " + this.accountService.returnUserToken(),
      }
    }

    let result = this.http.get<any>("https://emotidev.maristela.net/workout/getactivitynames", tableParam)
    return result;
  }
}
