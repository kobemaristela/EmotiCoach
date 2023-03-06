import { Injectable } from '@angular/core';
import {  MqttService} from 'ngx-mqtt';
import { MQTT_SERVICE_OPTIONS } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LiveDataService {
  

  constructor(private mqttService: MqttService) { 
    
  }
  
  async connectToBroker() {
    this.mqttService.connect(MQTT_SERVICE_OPTIONS);
    console.log("in connect to to brocker", this.mqttService);
    // Subscribe to the MQTT topic

    this.mqttService.observe('emoticoach/ppg/infrared').subscribe((message) => {
      console.log('Received message on topic my/topic: message.payload',message.payload);
    });

  }

  closeConnection(){
    this.mqttService.disconnect();
  }

  
}
