import { Injectable } from '@angular/core';
import {  IMqttMessage, MqttService} from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { MQTT_SERVICE_OPTIONS } from 'src/environments/tokens';


@Injectable({
  providedIn: 'root'
})
export class LiveDataService {
  

  constructor(private mqttService: MqttService) { 
    this.mqttService.connect(MQTT_SERVICE_OPTIONS);
  }
  
  connectToBroker() {

    // this.mqttService.publish("client_id/user/", "test");
    // console.log("in connect to to brocker", this.mqttService);
    // Subscribe to the MQTT topic
    // this.mqttService.observe('emoticoach/eda/activity')
    //   .subscribe((message: IMqttMessage) => {
    //     console.log('Received message on topic my/topic: message.payload',message.payload.toString());
    //   });
    return this.mqttService;

  }

  observeTopic(topic: string): Observable<IMqttMessage> {
    console.log("observing", topic)
    return this.mqttService.observe(topic);
  }

  closeConnection(){
    this.mqttService.disconnect();
  }

  publishToTopic(topic: string ,msg: string) {
    this.mqttService.unsafePublish(topic,msg, { qos: 1, retain: true });
    // .subscribe((d) => {
    //   console.log("published to" ,topic, d)
    // })
  }
  
}
