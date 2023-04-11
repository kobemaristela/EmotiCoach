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