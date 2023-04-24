import { Injectable } from '@angular/core';
import { session } from './Isession';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../../user/account.service';
import { set } from '../sets/Iset';

//API calls for workout are stored in this file
@Injectable({
  providedIn: 'root'
})
export class RequestSessionService {
  private user_token: string;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  
  //creates a new session in the database
  postCreateNewSessionObservable(session: session):Observable<any> {
    const formData = new FormData();
    formData.append("session", JSON.stringify(session));
    let tableParam = {
            headers: {
              "Authorization": "token " + this.accountService.returnUserToken(),
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/setsession", formData,tableParam);
    return res;
  }

  postDeleteSession(sessionId: number):Observable<any> {
    const formData = new FormData();
    formData.append("id", JSON.stringify(sessionId));
    let tableParam = {
            headers: {
              "Authorization": "token " + this.accountService.returnUserToken(),
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
              "Authorization": "token " + this.accountService.returnUserToken(),
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/editsession", formData,tableParam);
    return res;
  }

  postSaveExistingActivity(id: string, name: string, muscleGroups:string[]):Observable<any> {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("muscleGroups", JSON.stringify(muscleGroups));
    console.log("saving activity", muscleGroups)
    let tableParam = {
            headers: {
              "Authorization": "token " + this.accountService.returnUserToken(),
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/editactivity", formData,tableParam);
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
              "Authorization": "token " + this.accountService.returnUserToken(),
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/editset", formData,tableParam);
    res.subscribe(data => {
      console.log("post save set",data)
    })
    return res;
  }

  postSetAcitvity(sessionid: string, name: string, muscleGroups:string[], sets: set[]):Observable<any> {
    console.log("set acitivity", sessionid, name);
    const formData = new FormData();
    formData.append("session_id", sessionid);
    formData.append("name", name);
    formData.append("muscleGroups", JSON.stringify(muscleGroups));
    formData.append("sets", JSON.stringify(sets));

    let tableParam = {
            headers: {
              "Authorization": "token " + this.accountService.returnUserToken(),
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/setactivity", formData,tableParam)
    res.subscribe( (d)=>{
      console.log(d)
    })
    return res;
  }

  postDeleteSet(setID: string){
    console.log("delete set");
    const formData = new FormData();
    formData.append("id", setID);
    
    let tableParam = {
            headers: {
              "Authorization": "token " + this.accountService.returnUserToken(),
            }
    }

    let res = this.http.post<any>("https://emotidev.maristela.net/workout/deleteset", formData,tableParam)
    res.subscribe( d => {
      console.log("deleting set", d);
    });
    return res;
  }

  postDeleteActivity(activityID: string){
    console.log("delete acitivity");
    const formData = new FormData();
    formData.append("id", activityID);
    
    let tableParam = {
            headers: {
              "Authorization": "token " + this.accountService.returnUserToken(),
            }
      }

    let res = this.http.post<any>("https://emotidev.maristela.net/workout/deleteactivity", formData,tableParam)
    res.subscribe( d => {
      console.log("deleting activity",d);
    });
    return res;
  }

  postSetSet(activityId:string, set: set):Observable<any> {
    console.log("set set",activityId, set);
    const formData = new FormData();
 
    formData.append("activity_id", activityId);
    formData.append("set_num", set.set_num.toString());
    formData.append("weight",set.weight.toString());
    formData.append("reps", set.reps.toString());
    formData.append("rpe", set.rpe.toString());

    let tableParam = {
            headers: {
              "Authorization": "token " + this.accountService.returnUserToken(),
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/setset", formData,tableParam);
    res.subscribe( data => {
      console.log("set set",data)
    })
    return res;
  }

  getAllSessions():Observable<any> {
    let tableParam = {
            headers: {
              "Authorization": "token " + this.accountService.returnUserToken(),
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
              "Authorization": "token " + this.accountService.returnUserToken(),
            }
      }
    let res = this.http.post<any>("https://emotidev.maristela.net/workout/getsession", formData,tableParam);
    return res;

  }

}
