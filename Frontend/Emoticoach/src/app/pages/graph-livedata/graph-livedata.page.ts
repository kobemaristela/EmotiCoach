import { Component, OnInit } from '@angular/core';
import { LiveDataService } from 'src/app/services/livedata/live-data.service';
import Chart from 'chart.js/auto'
import { IMqttMessage } from 'ngx-mqtt';
import { DataGeneratorService } from 'src/app/services/data-generator/data-generator.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { MachineLearningService } from 'src/app/services/livedata/machine-learning.service';
import { first } from 'rxjs';

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

  readyTolift: Boolean;
  currentHeartrate: number;

  calibrating: boolean = false;
  intervalId: any;
  timer: number = 30;

  training: boolean = false;
  arousalDetection: boolean = false;
  arousalStatus: string = "";



  constructor(private liveDataService: LiveDataService,
    private dataGenerator: DataGeneratorService,
    private themeService: ThemeService,
    private machineLearning: MachineLearningService) {
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
          point: {
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
          point: {
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

        dataset.data.push(i + (Math.random() * 100));
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

  calibrate() {
    this.calibrating = true;
    // {
    //   this.machineLearning.getOnFinger()
    //     .subscribe(data => {
    //       if (data.responce == "On") {
    //         this.calibrating = false
    //         this.parse();
    //       }
    //     })
    // }

    this.parse();

  }

  parse() {
    //wait 30 seconds
    this.training = true;
    this.machineLearning.getTrain()
    .subscribe(d => {
        console.log(d)
        this.training = false;
        this.arousal();
      });

    // const interval = window.setInterval(() => {
    //   this.timer -= 1;
    //   if(this.timer <= 0){
    //     clearInterval(interval);
    //     this.training = false;
    //     // this.arousal();
    //   }
    // }, 1000);
    //this takes 30 seconds to respond



  }

  arousal() {
    this.arousalDetection = true
    this.intervalId = window.setInterval(() => {
      this.machineLearning.getArousal().subscribe(d => {
        console.log(d)
      }
      )

    }, 5000);


  }

  cancel() {
    this.calibrating = false;
    clearInterval(this.intervalId)
  }

}
