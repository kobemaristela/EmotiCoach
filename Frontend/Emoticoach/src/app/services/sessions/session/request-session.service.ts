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
    console.log(session)
    let tableParam = {
            headers: {
              "Authorization": CHAD_TOKEN
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/setsessiondata", formData,tableParam);
    res.subscribe(data => {
      console.log("post status",data)
    })
    return res;
  }

  // async postNewSession(session: session){
  //   const formData = new FormData();
  //   formData.append("session", JSON.stringify(session));
  //   let tableParam = {
  //           method: "POST",
  //           // integrate with justins token later
  //           headers: {
  //             "Authorization": CHAD_TOKEN,
  //           },
  //           body: formData
  //       }

  //   // change link to be read for a config file https://emotidev.maristela.net/
  //   const res = await fetch("https://emotidev.maristela.net/workout/setsessiondata", tableParam);
  //   console.log(res)
  //   return res;
  // }

  async postSaveExisting(session: session){}

  getAllSessionsObservable():Observable<any>{
    let tableParam = {
            headers: {
              "Authorization":CHAD_TOKEN
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
              "Authorization": CHAD_TOKEN
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/sessiondata", formData,tableParam);
    // res.subscribe(data => {
    //   console.log("json parsing in the request",data)
    // })
    return res;
  
  }

}
