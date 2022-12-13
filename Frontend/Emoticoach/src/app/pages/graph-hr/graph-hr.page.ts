import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataset, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-graph-hr',
  templateUrl: './graph-hr.page.html',
  styleUrls: ['./graph-hr.page.scss'],
})
export class GraphHrPage implements OnInit {

  ngOnInit(): void {
    
  }
  
  public scatterChartOptions: ChartOptions = {
    responsive: true,
  };

  public scatterChartType: ChartType = 'scatter';
  public scatterChartLabels = ['Time', 'Heart Rate BPM'];

  public scatterChartData: ChartDataset[] = [
    {
      data: [
        { x: 123705.000, y: 38 },
        { x: 123706.500, y: 38 },
        { x: 123708.300, y: 38 },
        { x: 123709.000, y: 43 },
        { x: 123710.400, y: 43 },
        { x: 123711.600, y: 44 },
        { x: 123714.900, y: 41 },
        { x: 123716.800, y: 40 },
        { x: 123717.800, y: 42 },
        { x: 123718.300, y: 51 },
        { x: 123724.800, y: 46 },
        { x: 123726.300, y: 45 },
        { x: 123729.200, y: 42 },
        { x: 123732.000, y: 40 },
        { x: 123733.600, y: 40 },
        { x: 123734.400, y: 44 },
        { x: 123735.100, y: 48 },
        { x: 123736.200, y: 49 },
        { x: 123737.900, y: 48 },
        { x: 123740.800, y: 44 },
        { x: 123743.600, y: 42 },
        { x: 123745.200, y: 41 },
        { x: 123746.500, y: 42 },
        { x: 123748.800, y: 40 },
        { x: 123751.000, y: 39 },
        { x: 123752.800, y: 38 },
        { x: 123755.200, y: 36 },
        { x: 123755.900, y: 42 },
        { x: 123757.100, y: 43 },
        { x: 123802.000, y: 39 },
        { x: 123803.300, y: 40 },
        { x: 123804.300, y: 43 },
        { x: 123805.500, y: 44 },
        { x: 123806.700, y: 44 },
        { x: 123808.200, y: 44 },
        { x: 123810.200, y: 42 },
        { x: 123812.300, y: 41 },
        { x: 123813.200, y: 44 },
        { x: 123814.400, y: 45 },
        { x: 123825.100, y: 40 },
        { x: 123825.600, y: 48 },
        { x: 123828.400, y: 45 },
        { x: 123829.400, y: 47 },
        { x: 123831.900, y: 44 },
        { x: 123833.900, y: 42 },
        { x: 123835.600, y: 41 },
        { x: 123836.900, y: 42 },
        { x: 123838.300, y: 42 },
        { x: 123839.200, y: 45 },
        { x: 123840.200, y: 47 },
        { x: 123842.600, y: 45 },
        { x: 123843.400, y: 48 },
        { x: 123844.700, y: 48 },
        { x: 123846.300, y: 47 },
        { x: 123847.500, y: 47 },
        { x: 123848.800, y: 47 },
        { x: 123850.000, y: 47 },
        { x: 123852.800, y: 44 },
        { x: 123855.000, y: 42 },
        { x: 123858.900, y: 39 },
        { x: 123900.300, y: 40 },
        { x: 123902.100, y: 39 },
        { x: 123903.100, y: 41 },
        { x: 123904.100, y: 44 },
        { x: 123905.200, y: 45 },
        { x: 123906.700, y: 44 },
        { x: 123907.500, y: 47 },
        { x: 123909.300, y: 46 },
        { x: 123910.100, y: 49 },
        { x: 123911.400, y: 49 },
        { x: 123912.500, y: 49 },
        { x: 123913.500, y: 51 },
        { x: 123914.500, y: 52 },
        { x: 123915.800, y: 51 },
        { x: 123918.100, y: 48 },
        { x: 123918.600, y: 56 },
        { x: 123919.400, y: 58 },
        { x: 123922.700, y: 53 },
        { x: 123926.700, y: 49 },
        { x: 123928.200, y: 48 },
        { x: 123929.000, y: 51 },
        { x: 123929.900, y: 53 },
        { x: 123930.500, y: 58 },
        { x: 123932.000, y: 56 },
        { x: 123933.600, y: 54 },
        { x: 123935.800, y: 51 },
        { x: 123937.200, y: 50 },
        { x: 123939.800, y: 47 },
        { x: 123940.900, y: 48 },
        { x: 123941.800, y: 50 },
        { x: 123944.400, y: 47 },
        { x: 123946.200, y: 45 },
        { x: 123949.300, y: 42 },
        { x: 123951.600, y: 40 },
        { x: 123954.200, y: 38 }
      ],
      label: 'Time vs Heart Rate BPM',
      pointRadius: 2
    },
  ];

}
