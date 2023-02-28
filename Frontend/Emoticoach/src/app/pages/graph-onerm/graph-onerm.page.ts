import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-graph-onerm',
  templateUrl: './graph-onerm.page.html',
  styleUrls: ['./graph-onerm.page.scss'],
})
export class GraphOnermPage implements OnInit {
  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        itemStyle: {
          color: '#833535'
        },
        showBackground: true,
        backgroundStyle: {
          color: '#929292'
        }
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
