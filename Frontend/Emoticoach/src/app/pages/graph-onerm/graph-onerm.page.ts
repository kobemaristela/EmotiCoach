import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'src/app/services/user/account.service';
import { map } from 'rxjs/operators';
import { result } from 'cypress/types/lodash';
import { table } from 'console';
import { CHAD_TOKEN } from 'src/environments/environment';

@Component({
  selector: 'app-graph-onerm',
  templateUrl: './graph-onerm.page.html',
  styleUrls: ['./graph-onerm.page.scss'],
})
export class GraphOnermPage implements OnInit {
  public chart: any; //hello
  workoutDates: any = [];

  constructor(private _http: HttpClient) { }

  loadData(){
    this.getData()

  }

  getData() {
    let tableParam = {
      headers: {
        "Authorization": CHAD_TOKEN,
      }
    }
    const formData = new FormData();
    formData.append("start_date", "2023-03-07");
    formData.append("length", "30");
    formData.append("activity", "bench");

    return this._http.post("https://emotidev.maristela.net/graph/getonermdata", formData, tableParam)
    .subscribe(((result: any) => {

      // initialize chart data
      let workoutDates = result['X']
      let onermData = result['y']
      console.log(workoutDates[0])
      console.log(result);

      this.chart = new Chart("OneRMChart", {
        type: 'bar', //this denotes tha type of chart
  
        data: {// values on X-Axis
          labels: workoutDates,
          datasets: [
            {
              label: "One Rep Max",
              data: onermData,
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
    this.getData();
  }

}
