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

  indexSelect(selectedGroup: string){
    return this.selectedGroup = selectedGroup;
  }


  updateChart(){
    console.log(this.workoutData)
    this.graphService.getMuscleXandY(this.weekNumber.toString()).subscribe( x_data => { 

      if(this.musclegroups.includes(this.selectedGroup)){
        let x_axis = new Array<string>(0);
        x_axis.push(this.selectedGroup)
        this.chart.data.labels = x_axis
        this.chart.update();
      }
      else{
        let x_axis = new Array<string>(0);
        x_axis.push(this.selectedGroup)
        this.chart.data.labels = x_axis
        this.chart.update();
      }
    });
    this.graphService.getMuscleXandY(this.weekNumber.toString()).subscribe( y_data => {
      this.musclegroups = y_data.X;
      this.workoutData = y_data.y;
      let index = this.musclegroups.indexOf(this.selectedGroup) //gets index of selected group


      if(index != -1){
        let y_axis = new Array<number>(0);
        y_axis.push(this.workoutData[index])
        this.chart.data.datasets[0].data = y_axis;
        this.chart.update();
      }
      else{
        let y_axis = new Array<number>(0);
        y_axis.push(0)
        this.chart.data.datasets[0].data = y_axis;
        this.chart.update();
      }
    });
  }

  ngOnInit() {
    this.chart = new Chart("MuscleGroupChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ["Select muscle group"], //workoutDates
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
