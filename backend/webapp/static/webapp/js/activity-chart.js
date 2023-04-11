let lineChart = document.getElementById("lineChart");
let barChart = document.getElementById("barChart");
let pieChart = document.getElementById("pieChart");
let heatChart = document.getElementById("heatChart");

let activityButton = document.getElementById("activityButton");
let currentActivity = activityButton.innerHTML;
let defaultRange = 365;

const getOneRMData = async(start_date, length, activity) => {
  const addData = new FormData();

  addData.append("start_date", start_date);
  addData.append("length", length);
  addData.append("activity", activity);

  let tableParam = {
      method: 'POST',
      headers: {
                'X-CSRFToken': csrfToken,
               },
      body: addData,
  };

  const res = await fetch(window.location.origin + '/graph/getonermdata', tableParam);
  let data = res.json();
  return data;
}
const getVolumeData = async(start_date, length, activity) => {
  const addData = new FormData();

  addData.append("start_date", start_date);
  addData.append("length", length);
  addData.append("activity", activity);

  let tableParam = {
      method: 'POST',
      headers: {
                'X-CSRFToken': csrfToken,
               },
      body: addData,
  };

  const res = await fetch(window.location.origin + '/graph/getvolumedata', tableParam);
  let data = res.json();
  return data;
}
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
const getActivityNames = async() => {
  let tableParam = {
    method: 'GET',
    headers: {
              'X-CSRFToken': csrfToken,
             }
  };

  const res = await fetch(window.location.origin + '/workout/getactivitynames', tableParam);
  let data = res.json();
  return data;
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
const GraphLineChart = (x, y) => {
  var data = [{
    x: x,
    y: y
  }]
  var layout = {
    margin: {l: 25, r: 0, b: 20, t: 0,pad: 0}, 
  }
  Plotly.newPlot(lineChart, data, layout);
}
const GraphBarChart = (x, y) => {
  var data = [{
    x: x,
    y: y,
    type: "bar"
  }]
  var layout = {
    margin: {l: 25, r: 0, b: 20, t: 0,pad: 0}, 
  }
  Plotly.newPlot(barChart, data, layout);
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
const activityClick = async(e) => {
  let clickedElement = e.target;
  activityButton.innerHTML = clickedElement.innerHTML;
  currentActivity = activityButton.innerHTML;

  getOneRMData(getDate(defaultRange), defaultRange, currentActivity).then((data) => GraphLineChart(data["X"], data["y"]));
  getVolumeData(getDate(defaultRange), defaultRange, currentActivity).then((data) => GraphBarChart(data["X"], data["y"]));
  getPieVolumeData(getDate(defaultRange), defaultRange).then((data) => GraphPieChart(data["values"], data["labels"]));
  getHeatmapData(currentActivity).then((data) => GraphHeatMap(data["z"]));
}

getActivityNames().then((data) => {
  let activities = data["activities"]
  let dropdown = document.getElementById("activitiesDropdown");

  activityButton.innerHTML = activities[0];
  currentActivity = activityButton.innerHTML;
  for (let i=0; i<activities.length; i++) {
    var activity = document.createElement('a');
    activity.className = "dropdown-item";
    activity.innerHTML = activities[i];
    activity.onclick = activityClick;
    dropdown.append(activity);
  }

  getOneRMData(getDate(defaultRange), defaultRange, currentActivity).then((data) => GraphLineChart(data["X"], data["y"]));
  getVolumeData(getDate(defaultRange), defaultRange, currentActivity).then((data) => GraphBarChart(data["X"], data["y"]));
  getPieVolumeData(getDate(defaultRange), defaultRange).then((data) => GraphPieChart(data["values"], data["labels"]));
  getHeatmapData(currentActivity).then((data) => GraphHeatMap(data["z"]));
});

GraphPieChart([19, 26, 55], ['Squat', 'Bench', 'Deadlift']);
GraphLineChart(['Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5'], [325, 400, 325, 426, 450] );
GraphBarChart(['Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5'], [3000, 4243, 3285, 5000, 3800])
GraphHeatMap([[1, null, 30, 50, 1, 22, 31, 22, 42, 51, 24, 37], [20, 1, 60, 80, 30, 29, 43, null, 23, 83, 23, null], [1, null, 30, 50, 1, 22, 31, 22, 42, 51, 24, 37], [1, null, 30, 50, 1, 22, 31, 22, 42, 51, 24, 37], [20, 1, 60, 80, 30, 29, 43, null, 23, 83, 23, null]]);



