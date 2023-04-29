import { Component, OnInit } from '@angular/core';
import { LiveDataService } from 'src/app/services/livedata/live-data.service';
import Chart from 'chart.js/auto'
import { IMqttMessage } from 'ngx-mqtt';
import { DataGeneratorService } from 'src/app/services/data-generator/data-generator.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-graph-livedata',
  templateUrl: './graph-livedata.page.html',
  styleUrls: ['./graph-livedata.page.scss'],
})
export class GraphLivedataPage implements OnInit {
  edaChart: Chart;
  ppgChart: Chart;
  count = 0;
  connectionOpen = false;
  connections = ['emoticoach/ppg/infrared', 'emoticoach/eda/activity']
  currentConnection = 'emoticoach/eda/activity'

  position: "Sitting" | "Standing" | "" = "";
  readyTolift: Boolean;
  currentHeartrate: number;

  constructor(private liveDataService: LiveDataService, private dataGenerator: DataGeneratorService, private themeService: ThemeService) {
    // this.readyTolift = true;
    this.currentHeartrate = 0;
  }

  //LiveDataChart
  ngOnInit() {
    this.ppgChart = new Chart("ppgChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [],
        datasets: [
          {
            label: 'Heartbeat',
            data: [],
            borderColor: this.themeService.getGraphColor(),
            backgroundColor: this.themeService.getGraphColor(),
            pointBackgroundColor: this.themeService.getGraphColor()
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        layout: {
          padding: {
            right: 20,
            left: 10
          }
        },
        elements: {
          point:{
              radius: 0
          }
      },
        plugins: {
          legend: {
            labels: {
              color: this.themeService.getSuccessColor()
            }
          },
          colors: {
            forceOverride: true
          }
        },
        scales: {
          y: {
            ticks: {
              color: this.themeService.getSuccessColor(),
              font: {
                size: 14, // 'size' now within object 'font {}'
              },

            }
          },
          x: {
            ticks: {
              color: this.themeService.getSuccessColor(),
              font: {
                size: 10 // 'size' now within object 'font {}'
              },

            }
          }
        }
      }

    });

    this.edaChart = new Chart("edaChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [],
        datasets: [
          {
            label: "EDA",
            data: [],

            borderColor: this.themeService.getGraphColor(),
            backgroundColor: this.themeService.getGraphColor(),
            pointBackgroundColor: this.themeService.getGraphColor()
          }
        ]
      },
      options: {
        aspectRatio: 1,
        layout: {
          padding: {
            right: 20,
            left: 10
          }
        },
        elements: {
          point:{
              radius: 0
          }
      },
        plugins: {
          legend: {
            labels: {
              color: this.themeService.getSuccessColor()
            }
          },
          colors: {
            forceOverride: true
          }
        },
        scales: {
          y: {
            ticks: {
              color: this.themeService.getSuccessColor(),
              font: {
                size: 14, // 'size' now within object 'font {}'
              },


            }
          },
          x: {
            ticks: {
              color: this.themeService.getSuccessColor(),
              font: {
                size: 10 // 'size' now within object 'font {}'
              },


            }
          }
        }
      }
    });
  }



  async openConnection() {
    if (this.connectionOpen) {
      return;
    }
    this.connectionOpen = true;
    this.loadChart(this.edaChart, this.connections[1]);
    this.loadChart(this.ppgChart, this.connections[0]);
    // this.testObsere(this.edaChart);
    // this.testObsere(this.ppgChart);

  }

  closeConnection() {
    if (this.connectionOpen) {
      this.connectionOpen = false;
      this.closeChart(this.edaChart);
      this.closeChart(this.ppgChart);

    }
  }

  loadChart(chart: Chart, connection: string) {

    console.log("Current connection", this.currentConnection);

    if (chart) {

      console.log("creating livedata service");

      this.liveDataService.connectToBroker().observe(connection).subscribe(
        (message: IMqttMessage) => {
          

          this.count += 1
          console.log(message.payload.toString());
          if (chart.data.labels) {
            chart.data.labels.push(this.count);
          }

          chart.data.datasets.forEach((dataset) => {
            dataset.data.push(+message.payload.toString());
          });

          if (chart.data.labels && chart.data.labels.length > 150) {
            chart.data.labels.shift();
            chart.data.datasets.forEach((dataset) => {
              dataset.data.shift();
            });
          }
          chart.update('none');
        });
    }


  }

  async testObsere(chart: Chart) {
   
    for (let i = 1000; i < 2000; i += 1) {
   
        this.count += 1
        if (chart.data.labels) {
          chart.data.labels.push(this.count);
        }
  
        chart.data.datasets.forEach((dataset) => {

          dataset.data.push(i + (Math.random() * 100) );
        });
  
        if (chart.data.labels && chart.data.labels.length > 100) {
          chart.data.labels.shift();
          chart.data.datasets.forEach((dataset) => {
            dataset.data.shift();
          });
        }
        chart.update('none');
      }
      

    }
  


  closeChart(chart: Chart) {

    this.liveDataService.closeConnection();
    chart.update('none');
  }

  generateworkouts() {
    this.dataGenerator.runScript()
  }

}
