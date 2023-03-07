import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { HttpClient } from '@angular/common/http';
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
      .subscribe((result => {

        // initialize chart data
        // let workoutDates = result[X]
        console.log(result);
        return result}));
  }

  ngOnInit() {
    this.createChart();
  }
  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
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
