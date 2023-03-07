import { Injectable } from '@angular/core';
import { session } from './Isession';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CHAD_TOKEN } from 'src/environments/environment';
import { set } from '../sets/Iset';
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
    // res.subscribe(data => {
    //   console.log("delete responce",data)
    // })
    return res;
  }
  
  postSaveExistingSession(id: string, name: string, duration: string, datetime: string){
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("datetime", datetime);
    
    let tableParam = {
            headers: {
              "Authorization": CHAD_TOKEN,
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/editsession", formData,tableParam);
    res.subscribe(data => {
      console.log("post Save ExistingSession",data)
    })
    return res;
  }

  postSaveExistingActivity(id: string, name: string){
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    
    let tableParam = {
            headers: {
              "Authorization": CHAD_TOKEN,
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/editactivity", formData,tableParam);
    res.subscribe(data => {
      console.log("post save acitivty",data)
    })
    return res;
  }

  postSaveExistingSet(set:set){
    const formData = new FormData();
    formData.append("id", set.id.toString());
    formData.append("weight",set.weight.toString());
    formData.append("reps", set.reps.toString());
    formData.append("rpe", set.rpe.toString());
    let tableParam = {
            headers: {
              "Authorization": CHAD_TOKEN,
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/editset", formData,tableParam);
    res.subscribe(data => {
      console.log("post save set",data)
    })
    return res;
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
