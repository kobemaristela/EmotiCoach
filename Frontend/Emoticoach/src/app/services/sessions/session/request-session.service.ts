import { Injectable } from '@angular/core';
import { session } from './Isession';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CHAD_TOKEN } from 'src/environments/environment';
import { set } from '../sets/Iset';

//API calls for workout are stored in this file
@Injectable({
  providedIn: 'root'
})
export class RequestSessionService {

  constructor(private http: HttpClient) { }
  
  //creates a new session in the database
  postCreateNewSessionObservable(session: session):Observable<any> {
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

  postDeleteSessionObservable(sessionId: number):Observable<any> {
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
  
  postSaveExistingSession(id: string, name: string, duration: number, datetime: string):Observable<any> {
    const formData = new FormData();
    let strduration = duration+""
    formData.append("id", id);
    formData.append("name", name);
    formData.append("duration", strduration);
    formData.append("datetime", datetime);
    // formData.append("muscleGroup", datetime);
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

  postSaveExistingActivity(id: string, name: string, muscleGroups:string[]):Observable<any> {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("muscleGroups", JSON.stringify(muscleGroups));
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

  postSaveExistingSet(set:set):Observable<any> {
    console.log("setset post", set)
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

  postSetAcitvity():Observable<any> {
    console.log("set acitivity");
    const formData = new FormData();
 
    // formData.append("activity_id", activityId);
    // formData.append("set_num", set.set_num.toString());
    // formData.append("weight",set.set_num.toString());
    // formData.append("reps", set.set_num.toString());
    // formData.append("rpe", set.set_num.toString());

    let tableParam = {
            headers: {
              "Authorization": CHAD_TOKEN,
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/setset", formData,tableParam);
    res.subscribe(data => {
      console.log("post status",data)
    })
    return res;
  }
  
  postSetSet(activityId:string, set: set):Observable<any> {
    console.log("set set",activityId, set);
    const formData = new FormData();
 
    formData.append("activity_id", activityId);
    formData.append("set_num", set.set_num.toString());
    formData.append("weight",set.set_num.toString());
    formData.append("reps", set.set_num.toString());
    formData.append("rpe", set.set_num.toString());

    let tableParam = {
            headers: {
              "Authorization": CHAD_TOKEN,
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/setset", formData,tableParam);
    res.subscribe(data => {
      console.log("post status",data)
    })
    return res;
  }

  getAllSessions():Observable<any> {
    let tableParam = {
            headers: {
              "Authorization": CHAD_TOKEN,
            }
      }
    let res = this.http.get<any>("https://emotidev.maristela.net/workout/getallsessions", tableParam);
    
    return res;
  
  }

  postGetSessionObservable(sessionId: number):Observable<session> {
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
