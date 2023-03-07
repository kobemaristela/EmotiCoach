import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'src/app/services/user/account.service';
import { map } from 'rxjs/operators';
import { result } from 'cypress/types/lodash';
import { table } from 'console';

@Component({
  selector: 'app-graph-volume',
  templateUrl: './graph-volume.page.html',
  styleUrls: ['./graph-volume.page.scss'],
})
export class GraphVolumePage implements OnInit {
  public chart: any; //hello
  workoutDates: any = [];

  constructor(private _http: HttpClient) { }

  loadData(){
    this.getData()

  }

  getData() {
    let tableParam = {
      headers: {
        "Authorization": "token 1a01dbfd13486fca1469a734de65780d81f3aaa1",
      }
    }
    const formData = new FormData();
    formData.append("start_date", "2023-03-07");
    formData.append("length", "30");
    formData.append("activity", "bench");

    return this._http.post("https://emotidev.maristela.net/graph/getvolumedata", formData, tableParam)
    .subscribe(((result: any) => {

      // initialize chart data
      let workoutDates = result['X']
      let volumeData = result['y']
      console.log(workoutDates[0])
      console.log(result);

      this.chart = new Chart("MyChart", {
        type: 'bar', //this denotes tha type of chart
  
        data: {// values on X-Axis
          labels: workoutDates,
          datasets: [
            {
              label: "Volume",
              data: volumeData,
              backgroundColor: 'blue'
            }
          ]
        },
        options: {
          aspectRatio: 2.5
        }
  
      });
      return result}));
  }

  ngOnInit() {

    this.createChart();
  }
  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        // labels: workoutDates,
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

}
