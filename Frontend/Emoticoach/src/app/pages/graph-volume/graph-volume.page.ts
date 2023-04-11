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
  xAxisDates: string[] = [];
  rightsideWeek: Date;
  previousWeekFormatted: string; //need this to be set to most recent sunday
  rightsideWeekFormatted: string;

constructor(private graphService: GraphService) {
    this.previousWeek = this.graphService.getPreviousWeek(this.graphService.getCurrentDate());
    this.rightsideWeek = this.graphService.getCurrentDate();
    this.previousWeekFormatted = this.graphService.formatDate(this.graphService.getPreviousWeek(this.graphService.currentDate))
    this.rightsideWeekFormatted = this.graphService.formatDate(this.graphService.getCurrentDate())
   }

   returnPast7Days(date: Date) {
    return Array(7).fill(new Date(date)).map((el, idx) =>
      new Date(el.setDate(el.getDate() - el.getDay() + idx)))
  }

    formatXaxis(dates: Date[]){
    this.xAxisDates.length = 0
    for(let i=0; i<dates.length; i++){
      this.xAxisDates.push(this.graphService.formatDate(dates[i]));
    }
  }

  getWorkoutNames(){
    this.graphService.getActivityNames().subscribe(data => {
      for(let i=0; i<data.activities.length; i++){
        this.workouts.push(data.activities[i]);
      }
    })
  }

  displayPreviousWeek(){
    this.formatXaxis(this.returnPast7Days(this.previousWeek))
    this.previousWeek = this.graphService.getPreviousWeek(this.previousWeek);
    this.rightsideWeek = this.graphService.getPreviousWeek(this.rightsideWeek);
    this.previousWeekFormatted = this.xAxisDates[0];
    this.rightsideWeekFormatted = this.xAxisDates[6];
    this.updateChart();
  }

  displayNextWeek(){
    this.formatXaxis(this.returnPast7Days(this.graphService.getNextWeek(this.rightsideWeek)))
    this.previousWeek = this.graphService.getNextWeek(this.previousWeek);
    this.rightsideWeek = this.graphService.getNextWeek(this.rightsideWeek);
    this.previousWeekFormatted = this.xAxisDates[0];
    this.rightsideWeekFormatted = this.xAxisDates[6];
    this.updateChart();
  }

  updateChart(){
    this.graphService.getVolumeXandY(this.graphService.formatDateforAPI(this.previousWeek), this.selectedWorkout).subscribe( x_data => {
      this.workoutDates.length = 7;
      this.workoutDates = x_data.X;
      this.chart.data.labels = this.xAxisDates;
      this.chart.update();
    });
    this.graphService.getVolumeXandY(this.graphService.formatDateforAPI(this.previousWeek), this.selectedWorkout).subscribe( y_data => {
      this.workoutData.length = 7;
      this.workoutData = y_data.y;
      this.chart.data.datasets[0].data = this.workoutData;
      this.chart.update();
    });
  }


  ngOnInit() {
    let xAxisInit = this.returnPast7Days(this.previousWeek);
    this.xAxisDates.length = 0
    for(let i=0; i<xAxisInit.length; i++){
      this.xAxisDates.push(this.graphService.formatDate(xAxisInit[i]));
    }
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.xAxisDates, //workoutDates
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