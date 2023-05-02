// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
export const environment = {
    production: false
  };

export const MUSCLE_LIST: string[] = [
  "chest", 
  "tricep", 
  "bicep", 
  "shoulder", 
  "upper_back", 
  "lower_back", 
  "quadricep",
  "glute",
  "calve",
  "abdominal",
  "hamstring"
];


// export const MQTT_SERVICE_OPTIONS:IMqttServiceOptions = {
//   hostname: 'emotimqtt.maristela.net',
//   port: 8083,
//   protocol: 'wss',
//   username: 'emoticoach',
//   password: '7bf#oV&dq2HTLjG6',
//   connectOnCreate: false,
//   clean: true,
//   clientId: 'emoticoach-app-1',
//   ca:[]
// };