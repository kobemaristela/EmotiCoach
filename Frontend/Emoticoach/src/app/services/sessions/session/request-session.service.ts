import { Injectable } from '@angular/core';
import { session } from './Isession';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RequestSessionService {

  constructor(private http: HttpClient) { }
  

  //creates a new session in the database
  async postNewSession(session: session){
    const formData = new FormData();

    formData.append("session", JSON.stringify(session));

    let tableParam = {
            method: "POST",
            // integrate with justins token later
            headers: {
              "Authorization": "token 4ad8de41d4654423b98eb938a11fbc17afa25e4c",
            },
            body: formData
        }
  
    // change link to be read for a config file https://emotidev.maristela.net/
    const res = await fetch("https://emotidev.maristela.net/workout/setsessiondata", tableParam);
    return res.json();
  }

  async postSaveExisting(session: session){

  }

  async getAllSessions(){
    let tableParam = {
            method: "GET",
            headers: {
              "Authorization": "token 4ad8de41d4654423b98eb938a11fbc17afa25e4c",
            }
        }
  
    // change link to be read for a config file https://emotidev.maristela.net/
    const res = await fetch("https://emotidev.maristela.net/workout/getallsessions", tableParam).then(response => response.json());
    console.log(res)
    return res;
  }
}
