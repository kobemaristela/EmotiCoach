let fourWeeksButton = document.getElementById("fourWeeksButton");
let sevenDayButton = document.getElementById("sevenDayButton");
let oneYearButton = document.getElementById("oneYearButton");
let todayButton = document.getElementById("todayButton");
let leftChevron = document.getElementById("leftChevron");
let rightChevron = document.getElementById("rightChevron");
let lineChart = document.getElementById("lineChart");
let sleepInput = document.getElementById("sleepInput");
let dateInput = document.getElementById("dateInput");
let timeInput = document.getElementById("timeInput");
let addsleepButton = document.getElementById("addsleepButton");
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
    fillSleepTable();
});
sevenDayButton.addEventListener("click", () => {
    hoverBold(sevenDayButton);
    fillSleepTable();
});
oneYearButton.addEventListener("click", () => {
    hoverBold(oneYearButton);
    fillSleepTable();
});
todayButton.addEventListener("click", () => {
    currentInterval = 0;
    fillSleepTable();
});
leftChevron.addEventListener("click", () => {
    currentInterval += 1;
    fillSleepTable();
});
rightChevron.addEventListener("click", () => {
    if (currentInterval > 0) {
        currentInterval -= 1;
        fillSleepTable();
    }
});
const setSleepData = async(sleep, datetime) => {
    const addData = new FormData();

    addData.append("sleep", sleep);
    addData.append("datetime", datetime);

    let tableParam = {
        method: 'POST',
        headers: {
                  'X-CSRFToken': csrfToken,
                 },
        body: addData,
    };

    const res = await fetch(window.location.origin + '/user/setsleep', tableParam);
    let data = res.json();
    return data;
}
const fillSleepData = () => {
    const date = new Date();

    dateInput.value = date.getFullYear() + "-" + (date.getMonth()+1) + "-" +  date.getDate();
    timeInput.value = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
const submitSleepData = () => {
    let dt = dateInput.value + "T" + timeInput.value + "Z";
    let sleep = sleepInput.value

    setSleepData(sleep, dt);
    fillSleepTable();
}
const getSleepData = async(range, interval) => {
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

    const res = await fetch(window.location.origin + '/user/getsleeptable', tableParam);
    let data = res.json();
    return data;
}
const fillSleepTable = () => {
    let tableBody = document.getElementById("tableBody");
    let dateRangeDisplay = document.getElementById("dateRangeDisplay");
    tableBody.innerHTML = "";
    getSleepData(getRange(currentBold.id), currentInterval).then((data) => {
        let tableData = data["tableData"];
        let dateRange = data["daterange"];
        for (let i = 0; i < tableData.length; i++){
            tr = document.createElement('tr');

            date = document.createElement('td');
            date.innerHTML = tableData[i]["date"];
            time = document.createElement('td');
            time.innerHTML = tableData[i]["time"];
            sleep = document.createElement('td');
            sleep.innerHTML = tableData[i]["sleep"];

            tr.append(date);
            tr.append(time);
            tr.append(sleep);

            tableBody.append(tr);
        }
        dateRangeDisplay.innerHTML = dateRange;
    })
    plotSleep();
}
const getRange = (range) => {
    if (range == "oneYearButton") {
        return 365;
    } else if (range == "sevenDayButton") {
        return 7;
    } else if (range == "fourWeeksButton") {
        return 28;
    }
}
const getSleepPlotData = async () => {
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

    const res = await fetch(window.location.origin + '/graph/getsleeplinegraph', tableParam);
    let data = res.json();
    return data;
}
const plotSleep = () => {
    getSleepPlotData().then((data) => {
        var data = [{
            x: data["X"],
            y: data["y"],
            type: 'bar'
        }]
        var layout = {
        margin: {l: 30, r: 30, b: 20, t: 10,pad: 0}, 
        }
        Plotly.newPlot(lineChart, data, layout);
    });
}
fillSleepTable();

addSleepButton.addEventListener("click", fillSleepData);
submit.addEventListener("click", submitSleepData)