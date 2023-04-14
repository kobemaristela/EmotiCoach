import { Component, OnInit } from '@angular/core';
import { LiveDataService } from 'src/app/services/livedata/live-data.service';
import Chart from 'chart.js/auto'
import { IMqttMessage } from 'ngx-mqtt';

@Component({
  selector: 'app-graph-livedata',
  templateUrl: './graph-livedata.page.html',
  styleUrls: ['./graph-livedata.page.scss'],
})
export class GraphLivedataPage implements OnInit {
  chart: Chart;
  count = 0;
  connectionOpen = false;
  connections = ['emoticoach/ppg/infrared', 'emoticoach/eda/activity']
  currentConnection = 'emoticoach/eda/activity'
  constructor(private liveDataService: LiveDataService) {

  }
  //LiveDataChart
  ngOnInit() {
    this.chart = new Chart("LiveDataChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [],
        datasets: [
          {
            label: this.currentConnection,
            data: [],
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }


  openConnection() {
    if(this.connectionOpen){
      return;
    }

    this.connectionOpen = true;
    console.log("Current connection", this.currentConnection);

    if (this.chart) {
      console.log("creating livedata service");
      
      
      this.liveDataService.connectToBroker() 
      .observe(this.currentConnection)
        .subscribe((message: IMqttMessage) => {
          console.log('Received message on topic my/topic: message.payload', message.payload.toString());
          
          this.count += 1
          if (this.chart.data.labels) {
            this.chart.data.labels.push(this.count);

          }

          this.chart.data.datasets.forEach((dataset) => {
            dataset.data.push(+message.payload.toString());
          });
          
          if (this.chart.data.labels && this.chart.data.labels.length > 100) {
            this.chart.data.labels.shift();
            this.chart.data.datasets.forEach((dataset) => {
              dataset.data.shift();
            });
          }
          this.chart.update('none');
        });
    }
  }


  closeConnection() {
    if (this.connectionOpen) {
      this.connectionOpen = false;
      this.liveDataService.closeConnection();
      this.chart.update('none');
    }

  }

}
