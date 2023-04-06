import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { GraphService } from 'src/app/services/graph/graph.service';

@Component({
  selector: 'app-graph-onerm',
  templateUrl: './graph-onerm.page.html',
  styleUrls: ['./graph-onerm.page.scss'],
})
export class GraphOnermPage implements OnInit {
  public chart: any; 
  workoutData: number[] = [];
  workouts: any[] = [];
  workoutDates: string[] = [];
  selectedWorkout = "";

  constructor(private graphService: GraphService) { }

  getWorkoutNames(){
    this.graphService.getActivityNames().subscribe(data => {
      for(let i=0; i<data.activities.length; i++){
        this.workouts.push(data.activities[i]);
      }
    })
  }

  updateChart(){
    this.graphService.getOneRMXandY("2023-03-23", this.selectedWorkout).subscribe( x_data => {
      this.workoutDates = x_data.X;
      this.chart.data.labels = this.workoutDates;
      this.chart.update();
    });
    this.graphService.getOneRMXandY("2023-03-23", this.selectedWorkout).subscribe( y_data => {
      this.workoutData = y_data.y;
      this.chart.data.datasets[0].data = this.workoutData;
      this.chart.update();
    });
  }

  ngOnInit() {
    this.chart = new Chart("OneRMgraph", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [], //workoutDates
        datasets: [
          {
            label: "One Rep Max",
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

    this.chart.options.animation = true;
    this.getWorkoutNames();
  }

}
