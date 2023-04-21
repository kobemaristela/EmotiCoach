let oneDayButton = document.getElementById("yearButton");
let sevenDayButton = document.getElementById("weekButton");
let weekButton = document.getElementById("sevenDayButton");
let todayButton = document.getElementById("todayButton");
let leftChevron = document.getElementById("leftChevron");
let rightChevron = document.getElementById("rightChevron");
let lineChart = document.getElementById("lineChart");
let weightInput = document.getElementById("weightInput");
let dateInput = document.getElementById("dateInput");
let timeInput = document.getElementById("timeInput");
let currentBold = weekButton;

let currentInterval = 0;

sevenDayButton.classList.add("font-weight-bold");

const setWeightData = async(weight, datetime) => {
    const addData = new FormData();

    addData.append("weight", weight);
    addData.append("datetime", datetime);

    let tableParam = {
        method: 'POST',
        headers: {
                  'X-CSRFToken': csrfToken,
                 },
        body: addData,
    };

    const res = await fetch(window.location.origin + '/user/setweight', tableParam);
    let data = res.json();
    return data;
}

setWeightData(135, "2022-02-11 13:30:22");

var data = [{
    x: ["Apr 1", "Apr 2", "Apr 3", "Apr 4", "Apr 5", "Apr 6", "Apr 7", "Apr 8", "Apr 9", "Apr 10", "Apr 11", "Apr 12", "Apr 13", "Apr 14", "Apr 15", "Apr 16", "Apr 17", "Apr 18", "Apr 19", "Apr 20"],
    y: [151, 150, 148, 154, 160, 158, 163, 172, 167, 170, 173, 170, 175, 171, 168, 167, 167, 165, 168, 165, 163]
  }]
var layout = {
margin: {l: 30, r: 30, b: 20, t: 10,pad: 0}, 
}
Plotly.newPlot(lineChart, data, layout);