import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'src/app/services/user/account.service';
import { map } from 'rxjs/operators';
import { result } from 'cypress/types/lodash';
import { CHAD_TOKEN } from 'src/environments/environment';

@Component({
  selector: 'app-graph-volume',
  templateUrl: './graph-volume.page.html',
  styleUrls: ['./graph-volume.page.scss'],
})
export class GraphVolumePage implements OnInit {
  public chart: any; 
  workoutDates: any = [];

  constructor(private _http: HttpClient, private accountService: AccountService) { }

  loadData(){
    this.getData()

  }

  getData() {
    console.log(this.accountService.returnUserToken());
    let tableParam = {
      headers: {
        "Authorization": "token " + this.accountService.returnUserToken(),
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
    this.getData();
  }

}