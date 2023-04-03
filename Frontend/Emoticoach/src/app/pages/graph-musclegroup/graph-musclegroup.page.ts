import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { GraphService } from 'src/app/services/graph/graph.service';
import { MUSCLE_LIST } from 'src/environments/environment';

@Component({
  selector: 'app-graph-musclegroup',
  templateUrl: './graph-musclegroup.page.html',
  styleUrls: ['./graph-musclegroup.page.scss'],
})
export class GraphMusclegroupPage implements OnInit {
  public chart: any; 
  workoutData: number[] = [];
  musclegroups: any[] = [];
  workoutDates: string[] = [];
  selectedGroup = "";
  muscleList = MUSCLE_LIST;

  constructor(private graphService: GraphService) { }

  getMuscleGroups(){ //change to getmusclegroups api
    for(let i=0; i<this.muscleList.length; i++){
      this.musclegroups.push(this.muscleList[i]);
    }
  }

  updateChart(){
    this.graphService.getMuscleXandY("1").subscribe( x_data => { //don't we need musclegroup parameter?
      this.workoutDates = x_data.X;
      this.chart.data.labels = this.workoutDates;
      this.chart.update();
    });
    this.graphService.getMuscleXandY("1").subscribe( y_data => {
      this.workoutData = y_data.y;
      this.chart.data.datasets[0].data = this.workoutData;
      this.chart.update();
    });
  }

  ngOnInit() {
    this.chart = new Chart("MuscleGroupChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [], //workoutDates
        datasets: [
          {
            label: "Muscle Groups",
            data: [], //volumeData here
            backgroundColor: '#833535',
            borderColor: '#6D6D6D'
          }
        ]
      },
      options: {
        aspectRatio: 1
          }
    });

    this.getMuscleGroups();
  }

}
