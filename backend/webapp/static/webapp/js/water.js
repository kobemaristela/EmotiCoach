let fourWeeksButton = document.getElementById("fourWeeksButton");
let sevenDayButton = document.getElementById("sevenDayButton");
let oneDayButton = document.getElementById("oneDayButton");
let todayButton = document.getElementById("todayButton");
let leftChevron = document.getElementById("leftChevron");
let rightChevron = document.getElementById("rightChevron");
let lineChart = document.getElementById("lineChart");
let waterInput = document.getElementById("waterInput");
let dateInput = document.getElementById("dateInput");
let timeInput = document.getElementById("timeInput");
let addwaterButton = document.getElementById("addwaterButton");
let submit = document.getElementById("submit");

let currentBold = sevenDayButton;

let currentInterval = 0;

sevenDayButton.classList.add("font-weight-bold");

const hoverBold = (button) => {
    currentBold.classList.remove("font-weight-bold");
    button.classList.add("font-weight-bold");
    currentBold = button;
}

fourWeeksButton.addEventListener("click", () => {
    hoverBold(fourWeeksButton);
    fillWaterTable();
});
sevenDayButton.addEventListener("click", () => {
    hoverBold(sevenDayButton);
    fillWaterTable();
});
oneDayButton.addEventListener("click", () => {
    hoverBold(oneDayButton);
    fillWaterTable();
});
todayButton.addEventListener("click", () => {
    currentInterval = 0;
    fillWaterTable();
});
leftChevron.addEventListener("click", () => {
    currentInterval += 1;
    fillWaterTable();
});
rightChevron.addEventListener("click", () => {
    if (currentInterval > 0) {
        currentInterval -= 1;
        fillWaterTable();
    }
});
const setWaterData = async(water, datetime) => {
    const addData = new FormData();

    addData.append("water", water);
    addData.append("datetime", datetime);

    let tableParam = {
        method: 'POST',
        headers: {
                  'X-CSRFToken': csrfToken,
                 },
        body: addData,
    };

    const res = await fetch(window.location.origin + '/user/setwater', tableParam);
    let data = res.json();
    return data;
}
const fillWaterData = () => {
    const date = new Date();

    dateInput.value = date.getFullYear() + "-" + (date.getMonth()+1) + "-" +  date.getDate();
    timeInput.value = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
const submitWaterData = () => {
    let dt = dateInput.value + "T" + timeInput.value + "Z";
    let water = waterInput.value

    setWaterData(water, dt);
    fillWaterTable();
}
const getWaterData = async(range, interval) => {
    const addData = new FormData();

    addData.append("range", range);
    addData.append("interval", interval);

    let tableParam = {
        method: 'POST',
        headers: {
                  'X-CSRFToken': csrfToken,
                 },
        body: addData,
    };

    const res = await fetch(window.location.origin + '/user/getwatertable', tableParam);
    let data = res.json();
    return data;
}
const fillWaterTable = () => {
    let tableBody = document.getElementById("tableBody");
    let dateRangeDisplay = document.getElementById("dateRangeDisplay");
    tableBody.innerHTML = "";
    getWaterData(getRange(currentBold.id), currentInterval).then((data) => {
        let tableData = data["tableData"];
        let dateRange = data["daterange"];
        for (let i = 0; i < tableData.length; i++){
            tr = document.createElement('tr');

            date = document.createElement('td');
            date.innerHTML = tableData[i]["date"];
            time = document.createElement('td');
            time.innerHTML = tableData[i]["time"];
            water = document.createElement('td');
            water.innerHTML = tableData[i]["water"];

            tr.append(date);
            tr.append(time);
            tr.append(water);

            tableBody.append(tr);
        }
        dateRangeDisplay.innerHTML = dateRange;
    })
    plotWater();
}
const getRange = (range) => {
    if (range == "oneDayButton") {
        return 1;
    } else if (range == "sevenDayButton") {
        return 7;
    } else if (range == "fourWeeksButton") {
        return 28;
    }
}
const getWaterPlotData = async () => {
    var d = new Date();
    var begDate = getRange(currentBold.id) * currentInterval + getRange(currentBold.id)
    d.setDate(d.getDate()-begDate);
    let start_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    let length = getRange(currentBold.id);

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

    const res = await fetch(window.location.origin + '/graph/getwaterlinegraph', tableParam);
    let data = res.json();
    return data;
}
const plotWater = () => {
    getWaterPlotData().then((data) => {
        var data = [{
            x: data["X"],
            y: data["y"]
        }]
        var layout = {
        margin: {l: 30, r: 30, b: 20, t: 10,pad: 0}, 
        }
        Plotly.newPlot(lineChart, data, layout);
    });
}
fillWaterTable();

addWaterButton.addEventListener("click", fillWaterData);
submit.addEventListener("click", submitWaterData)