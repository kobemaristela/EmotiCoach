import { Injectable } from '@angular/core';
import { session } from './Isession';
import { HttpClient } from '@angular/common/http';
import { sessionRequest } from './IsessionRequest';
import { Observable } from 'rxjs';
import { CHAD_TOKEN } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RequestSessionService {

  constructor(private http: HttpClient) { }
  

  //creates a new session in the database
  postCreateNewSessionObservable(session: session){
    const formData = new FormData();
    formData.append("session", JSON.stringify(session));
    let tableParam = {
            headers: {
              "Authorization": CHAD_TOKEN,
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/setsession", formData,tableParam);
    res.subscribe(data => {
      console.log("post status",data)
    })
    return res;
  }

  postDeleteSessionObservable(sessionId: number){
    const formData = new FormData();

    formData.append("id", JSON.stringify(sessionId));
    let tableParam = {
            headers: {
              "Authorization": CHAD_TOKEN,
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/deletesession", formData,tableParam);
    res.subscribe(data => {
      console.log("delete responce",data)
    })
    return res;
  }
  
  postSaveExisting(session: session){

  }

  getAllSessionsObservable():Observable<any>{
    let tableParam = {
            headers: {
              "Authorization": CHAD_TOKEN,
            }
      }
    let res = this.http.get<any>("https://emotidev.maristela.net/workout/getallsessions", tableParam);
    
    return res;
  
  }

  postGetSessionObservable(sessionId: number):Observable<session>{
    const formData = new FormData();

    formData.append("id", JSON.stringify(sessionId));
    let tableParam = {
            headers: {
              "Authorization": CHAD_TOKEN,
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/getsession", formData,tableParam);
    res.subscribe(data => {
      console.log("json parsing in the request",data)
    })
    return res;
  
  }

}
