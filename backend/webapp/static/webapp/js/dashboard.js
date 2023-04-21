let heatChart = document.getElementById("heatChart");
let pieChart = document.getElementById("pieChart");

const getPieVolumeData = async(start_date, length) => {
    const addData = new FormData();
  
    addData.append("start_date", start_date);
    addData.append("length", length);
  
    let tableParam = {
      method: 'POST',
      headers: {
                'X-CSRFToken': csrfToken,
               },
      body: addData,
    };
  
  const res = await fetch(window.location.origin + '/graph/getpievolumedata', tableParam);
  let data = res.json();
  return data;
  
}
const getHeatmapData = async(activity) => {
    const addData = new FormData();
  
    addData.append("activity", activity);
  
    let tableParam = {
      method: 'POST',
      headers: {
                'X-CSRFToken': csrfToken,
               },
      body: addData,
    };
  
  const res = await fetch(window.location.origin + '/graph/getactivityheatmap', tableParam);
  let data = res.json();
  return data;
}
const GraphPieChart = (values, labels) => {
    var data = [{
      values: values,
      labels: labels,
      type: "pie"
    }]
  
    var layout = {
      margin: {l: 0, r: 0, b: 0, t: 0,pad: 0},
    }
    Plotly.newPlot( pieChart, data, layout);
}
const GraphHeatMap = (z) => {
    var data = [
      {
        z: z,
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
}
const getDate = (days) => {
    var date = new Date();
    date.setDate(date.getDate()-days);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
  
    date = yyyy + '-' +  mm + '-' + dd;
    return date;
}

getPieVolumeData(getDate(365), 365).then((data) => GraphPieChart(data["values"], data["labels"]));
getHeatmapData("all").then((data) => GraphHeatMap(data["z"]));

let weightChart = document.getElementById("weightChart");
let sleepChart = document.getElementById("sleepChart");

var data = [{
  x: ["Apr 1", "Apr 2", "Apr 3", "Apr 4", "Apr 5", "Apr 6", "Apr 7", "Apr 8", "Apr 9", "Apr 10", "Apr 11", "Apr 12", "Apr 13", "Apr 14", "Apr 15", "Apr 16", "Apr 17", "Apr 18", "Apr 19", "Apr 20"],
  y: [151, 150, 148, 154, 160, 158, 163, 172, 167, 170, 173, 170, 175, 171, 168, 167, 167, 165, 168, 165, 163]
}]
var layout = {
  margin: {l: 30, r: 30, b: 60, t: 0,pad: 0}, 
}
Plotly.newPlot(weightChart, data, layout);

var data = [{
  x: ["Apr 1", "Apr 2", "Apr 3", "Apr 4", "Apr 5", "Apr 6", "Apr 7"],
  y: ["8.1", "7.6", "6.4", "10.5", "7.5", "7.6", "8.1", "5.5"],
  type: "bar"
}]
var layout = {
  margin: {l: 25, r: 0, b: 20, t: 0,pad: 0}, 
}
Plotly.newPlot(sleepChart, data, layout);