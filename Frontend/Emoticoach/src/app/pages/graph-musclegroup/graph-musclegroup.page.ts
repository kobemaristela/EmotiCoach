import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'src/app/services/user/account.service';
import { map } from 'rxjs/operators';
import { result } from 'cypress/types/lodash';
import { table } from 'console';

@Component({
  selector: 'app-graph-musclegroup',
  templateUrl: './graph-musclegroup.page.html',
  styleUrls: ['./graph-musclegroup.page.scss'],
})
export class GraphMusclegroupPage implements OnInit {
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
    formData.append("week_num", "0");

    return this._http.post("https://emotidev.maristela.net/graph/getmusclegroupdata", formData, tableParam)
    .subscribe(((result: any) => {

      // initialize chart data
      let workoutDates = result['X']
      let musclegroupData = result['y']
      console.log(workoutDates[0])
      console.log(result);

      this.chart = new Chart("MuscleGroupChart", {
        type: 'bar', //this denotes tha type of chart
  
        data: {// values on X-Axis
          labels: workoutDates,
          datasets: [
            {
              label: "Muscle Group",
              data: musclegroupData,
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
