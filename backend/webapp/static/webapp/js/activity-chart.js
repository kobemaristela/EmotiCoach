lineChart = document.getElementById("lineChart");
barChart = document.getElementById("barChart");
pieChart = document.getElementById("pieChart");
heatChart = document.getElementById("heatChart");


Plotly.newPlot( pieChart, 
                [{
	                values: [19, 26, 55],
                    labels: ['Squat', 'Bench', 'Deadlift'],
                    type: "pie" 
                }], 
                {
                    margin: {l: 0, r: 0, b: 0, t: 0,pad: 0}, 
                } 
);

Plotly.newPlot( lineChart, 
    [{
        x: ['Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5'],
        y: [325, 400, 325, 425, 450] 
    }], 
    {
        margin: {l: 25, r: 0, b: 20, t: 0,pad: 0}, 
    } 
);

var data = [
    {
      x: ['Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5'],
      y: [3000, 4243, 3285, 5000, 3800],
      type: 'bar'
    }
  ];
  var layout = {
    barmode: 'group',
    margin: {l: 35, r: 0, b: 20, t: 0,pad: 0}, 
};
  Plotly.newPlot(barChart, data, layout);


  var data = [
    {
      z: [[1, null, 30, 50, 1, 22, 31, 22, 42, 51, 24, 37], [20, 1, 60, 80, 30, 29, 43, null, 23, 83, 23, null], [1, null, 30, 50, 1, 22, 31, 22, 42, 51, 24, 37], [1, null, 30, 50, 1, 22, 31, 22, 42, 51, 24, 37], [20, 1, 60, 80, 30, 29, 43, null, 23, 83, 23, null]],
      x: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'August', 'November', 'December'],
      y: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      type: 'heatmap',
      xgap: 5,
      ygap: 5,
      hoverongaps: false
    }
  ];

  var layout = {
    yaxis: {
        dtick: 1
      },
    margin: {t: 0,pad: 0},
  }
  
  Plotly.newPlot(heatChart, data, layout);

