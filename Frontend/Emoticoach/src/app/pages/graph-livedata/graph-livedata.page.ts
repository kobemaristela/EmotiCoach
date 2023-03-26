import { Component, OnInit } from '@angular/core';
import { LiveDataService } from 'src/app/services/livedata/live-data.service';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-graph-livedata',
  templateUrl: './graph-livedata.page.html',
  styleUrls: ['./graph-livedata.page.scss'],
})
export class GraphLivedataPage implements OnInit {
  chart: Chart;
  count = 0;
  connectionOpen = false;
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
            label: "ppg",
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
    this.connectionOpen = true;
    if (this.chart) {
      console.log("creating livedata service");
      this.liveDataService.connectToBroker().observe('emoticoach/ppg/infrared')
        .subscribe((message) => {
          console.log('Received message on topic my/topic: message.payload', message.payload);
          this.count += 1
          if (this.chart.data.labels) {
            this.chart.data.labels.push(this.count);

          }

          Array.from(message.payload).forEach((dataPoint) => {
            this.chart.data.datasets.forEach((dataset) => {
              dataset.data.push(dataPoint);
            });
          })
          if (this.chart.data.labels && this.chart.data.labels.length > 50) {
            
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
    }

  }

}
