import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { GraphService } from 'src/app/services/graph/graph.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

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
  timeView: string = "7";
  previousWeek: Date;
  xAxisDates: string[] = [];

  yAxisData: number[] = [];
  rightsideWeek: Date;
  previousWeekFormatted: string;
  rightsideWeekFormatted: string;

  constructor(private graphService: GraphService, private themeService: ThemeService) {
    this.previousWeek = this.graphService.getPreviousWeek(this.graphService.getCurrentDate());
    this.rightsideWeek = this.graphService.getCurrentDate();
    this.previousWeekFormatted = this.graphService.formatDate(this.graphService.getPreviousWeek(this.graphService.currentDate))
    this.rightsideWeekFormatted = this.graphService.formatDate(this.graphService.currentDate)
  }
  ngOnInit() {
    let xAxisInit = this.last7Days(this.graphService.currentDate);
    this.xAxisDates.length = 0
    for (let i = 0; i < xAxisInit.length; i++) {
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
              color: this.themeService.getSuccessColor(),
              display: true,
              autoSkip: false,
            },
          },
          y: {
            ticks: {
              color: this.themeService.getSuccessColor(),
            }
          }
        },
      },
    });

    this.chart.options.animation = true;
    this.getWorkoutNames();
  }

  changeDuration(duration: string){
    if(duration == "7"){
      this.chart.options.scales.x.ticks.display = true;
      let xAxisInit = this.last7Days(this.rightsideWeek);
      this.xAxisDates.length = 0
      for (let i = 0; i < xAxisInit.length; i++) {
        this.xAxisDates.push(this.graphService.formatDate(xAxisInit[i]));
      }
    }
    if(duration == "30"){
      this.chart.options.scales.x.ticks.display = false;
      let xAxisInit = this.last30Days(this.rightsideWeek);
      this.xAxisDates.length = 0
      for (let i = 0; i < xAxisInit.length; i++) {
        this.xAxisDates.push(this.graphService.formatDate(xAxisInit[i]));
      }
    }
    this.updateChart();
  }

  returnPast7Days(date: Date) { //this always starts on sunday

    return Array(7).fill(new Date(date)).map((el, idx) =>
      new Date(el.setDate(el.getDate() - el.getDay() + idx)))
  }


  last7Days(d: Date) {
    let result = [];
    for (let i = 0; i < 7; i++) {
      let x = new Date(d)
      x.setDate(x.getDate() - i)
      result.push(x)
    }
    return result.reverse();
  }

  last30Days(d: Date) {
    let result = [];
    for (let i = 0; i < 30; i++) {
      let x = new Date(d)
      x.setDate(x.getDate() - i)
      result.push(x)
    }
    return result.reverse();
  }

  formatXaxis(dates: Date[]) {
    this.xAxisDates.length = 0
    for (let i = 0; i < dates.length; i++) {
      this.xAxisDates.push(this.graphService.formatDate(dates[i]));
    }
  }

  populateYAxis(y_data: number[]) {
    this.yAxisData.length = 0;
    for (let i = 0; i < this.xAxisDates.length; i++) {
      if (this.getAfterSpace(this.workoutDates).includes(this.getAfterSlash(this.xAxisDates[i]))) {
        let index = this.getAfterSpace(this.workoutDates).indexOf(this.getAfterSlash(this.xAxisDates[i]))
        this.yAxisData.push(y_data[index])
      }
      else {
        this.yAxisData.push(0);
      }
    }
    return this.yAxisData
  }

  getAfterSlash(input: string) {
    return input.split('/')[1];
  }

  getAfterSpace(input: string[]) {
    let result = []
    for (let i = 0; i < input.length; i++) {
      if (typeof input[i] !== 'undefined') {
        result.push(input[i].split(' ')[1]);
      }
    }
    return result
  }

  getWorkoutNames() {
    this.graphService.getActivityNames().subscribe(data => {
      for (let i = 0; i < data.activities.length; i++) {
        this.workouts.push(data.activities[i]);
      }
    })
  }

  displayPreviousWeek() {
    if(this.timeView == "7"){
      this.chart.options.scales.x.ticks.display = true;
      this.formatXaxis(this.last7Days(this.previousWeek))
      this.previousWeek = this.graphService.getPreviousWeek(this.previousWeek);
      this.rightsideWeek = this.graphService.getPreviousWeek(this.rightsideWeek);
      this.previousWeekFormatted = this.xAxisDates[0];
      this.rightsideWeekFormatted = this.xAxisDates[6];
    }
    if(this.timeView == "30"){
      this.chart.options.scales.x.ticks.display = false;
      this.formatXaxis(this.last30Days(this.previousWeek))
      this.previousWeek = this.graphService.getPreviousMonth(this.previousWeek);
      this.rightsideWeek = this.graphService.getPreviousMonth(this.rightsideWeek);
      this.previousWeekFormatted = this.xAxisDates[0];
      this.rightsideWeekFormatted = this.xAxisDates[29];
    }
    this.updateChart();
  }

  displayNextWeek() {
    if(this.timeView == "7"){
      this.chart.options.scales.x.ticks.display = true;
      this.formatXaxis(this.last7Days(this.graphService.getNextWeek(this.rightsideWeek)))
      this.previousWeek = this.graphService.getNextWeek(this.previousWeek);
      this.rightsideWeek = this.graphService.getNextWeek(this.rightsideWeek);
      this.previousWeekFormatted = this.xAxisDates[0];
      this.rightsideWeekFormatted = this.xAxisDates[6];
    }
    if(this.timeView == "30"){
      this.chart.options.scales.x.ticks.display = false;
      this.formatXaxis(this.last30Days(this.graphService.getNextMonth(this.rightsideWeek)))
      this.previousWeek = this.graphService.getNextMonth(this.previousWeek);
      this.rightsideWeek = this.graphService.getNextMonth(this.rightsideWeek);
      this.previousWeekFormatted = this.xAxisDates[0];
      this.rightsideWeekFormatted = this.xAxisDates[29];
    }
    this.updateChart();
  }

  updateChart() {
    this.graphService.getVolumeXandY(this.graphService.formatDateforAPI(this.previousWeek), this.timeView, this.selectedWorkout).subscribe(x_data => {
      this.workoutDates = x_data.X;
      this.chart.data.labels = this.xAxisDates;
      this.chart.update();
    });
    this.graphService.getVolumeXandY(this.graphService.formatDateforAPI(this.previousWeek), this.timeView, this.selectedWorkout).subscribe(y_data => {
      this.workoutData = y_data.y;
      this.chart.data.datasets[0].data = this.populateYAxis(this.workoutData)
      this.chart.update();
    });
  }


 
}
