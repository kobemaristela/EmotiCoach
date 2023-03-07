import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestAccountService {

  constructor() { }

  async getUserToken(){
    const formData = new FormData();
    formData.append("username", "justin");
    formData.append("password", "fan");

    let tableParam = {
      method: "POST",
      body: formData
  }
  const res = await fetch("https://emotidev.maristela.net/user/login", tableParam);
  let registerResponse = await res.json();
  return registerResponse["token"];
  }
}
