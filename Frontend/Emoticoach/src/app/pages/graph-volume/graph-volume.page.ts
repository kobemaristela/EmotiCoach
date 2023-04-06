import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { GraphService } from 'src/app/services/graph/graph.service';


@Component({
  selector: 'app-graph-volume',
  templateUrl: './graph-volume.page.html',
  styleUrls: ['./graph-volume.page.scss'],
})
export class GraphVolumePage implements OnInit {
  public chart: any; 
  workoutData: number[] = [];
  workouts: any[] = [];
  workoutDates: string[] = [];
  selectedWorkout = "";
  previousWeek: Date;
  rightsideWeek: Date;

  constructor(private graphService: GraphService) { 
    this.previousWeek = this.graphService.getPreviousWeek();
    this.rightsideWeek = this.graphService.getCurrentDate();
  }

  getWorkoutNames(){
    this.graphService.getActivityNames().subscribe(data => {
      for(let i=0; i<data.activities.length; i++){
        this.workouts.push(data.activities[i]);
      }
    })
  }

  getPreviousWeek(){
    this.previousWeek = this.graphService.getPreviousWeek();
    this.updateChart();
  }

  getNextWeek(){
    this.previousWeek = this.graphService.getNextWeek();
    this.updateChart();
  }

  updateChart(){ //need function to get today's date in correct format
    this.graphService.getVolumeXandY(this.graphService.formatDate(this.previousWeek), this.selectedWorkout).subscribe( x_data => {
      this.workoutDates = x_data.X;
      this.chart.data.labels = this.workoutDates;
      this.chart.update();
    });
    this.graphService.getVolumeXandY(this.graphService.formatDate(this.previousWeek), this.selectedWorkout).subscribe( y_data => {
      this.workoutData = y_data.y;
      this.chart.data.datasets[0].data = this.workoutData;
      this.chart.update();
    });
  }

  ngOnInit() {
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [], //workoutDates
        datasets: [
          {
            label: "Volume",
            data: [], //volumeData here
            backgroundColor: '#833535',
            borderColor: '#6D6D6D'
          }
        ]
      },
      options: {
        aspectRatio: 1,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
              autoSkip: false,
            },
          },
        },
      },
    });

    this.chart.options.animation = true;
    this.getWorkoutNames();
  }

}