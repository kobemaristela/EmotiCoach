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
  musclegrouplist: any[] = [];
  musclegroups: string[] = [];
  selectedGroup = "";
  muscleList = MUSCLE_LIST;
  previousWeek: Date;
  previousWeekFormatted: string;
  rightsideWeek: Date;
  rightsideWeekFormatted: string;
  weekNumber: number;

  constructor(private graphService: GraphService) {
    this.previousWeek = this.graphService.getPreviousWeek(this.graphService.getCurrentDate());
    this.rightsideWeek = this.graphService.getCurrentDate();
    this.previousWeekFormatted = this.graphService.formatDate(this.graphService.getPreviousWeek(this.graphService.currentDate))
    this.rightsideWeekFormatted = this.graphService.formatDate(this.graphService.getCurrentDate())
    this.weekNumber = 0;
   }

  getMuscleGroups(){ //change to getmusclegroups api
    for(let i=0; i<this.muscleList.length; i++){
      this.musclegrouplist.push(this.muscleList[i]);
    }
  }

  displayPreviousWeek(){
    this.weekNumber += 1;
    this.previousWeek = this.graphService.getPreviousWeek(this.previousWeek);
    this.rightsideWeek = this.graphService.getPreviousWeek(this.rightsideWeek);
    this.previousWeekFormatted = this.graphService.formatDate(this.previousWeek);
    this.rightsideWeekFormatted = this.graphService.formatDate(this.rightsideWeek);
    this.updateChart();
  }

  displayNextWeek(){
    this.weekNumber -= 1;
    this.previousWeek = this.graphService.getNextWeek(this.previousWeek);
    this.rightsideWeek = this.graphService.getNextWeek(this.rightsideWeek);
    this.previousWeekFormatted = this.graphService.formatDate(this.previousWeek);
    this.rightsideWeekFormatted = this.graphService.formatDate(this.rightsideWeek);
    this.updateChart();
  }

  updateChart(){
    this.graphService.getMuscleXandY(this.weekNumber.toString()).subscribe( x_data => { 
      this.musclegroups = x_data.X;
      this.chart.data.labels = this.musclegroups;
      this.chart.update();
    });
    this.graphService.getMuscleXandY(this.weekNumber.toString()).subscribe( y_data => {
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
            label: "Reps",
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
    this.getMuscleGroups();
  }

}
