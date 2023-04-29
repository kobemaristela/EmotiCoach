let yearButton = document.getElementById("yearButton");
let weekButton = document.getElementById("weekButton");
let sevenDayButton = document.getElementById("sevenDayButton");
let todayButton = document.getElementById("todayButton");
let leftChevron = document.getElementById("leftChevron");
let rightChevron = document.getElementById("rightChevron");
let lineChart = document.getElementById("lineChart");
let weightInput = document.getElementById("weightInput");
let dateInput = document.getElementById("dateInput");
let timeInput = document.getElementById("timeInput");
let addWeightButton = document.getElementById("addWeightButton");
let submit = document.getElementById("submit");
let weightButton = document.getElementById("weightButton");
let bmiButton = document.getElementById("bmiButton");

let currentBold = sevenDayButton;
let currentGraph = weightButton;

let currentInterval = 0;

sevenDayButton.classList.add("font-weight-bold");

const hoverBold = (button) => {
    currentBold.classList.remove("font-weight-bold");
    button.classList.add("font-weight-bold");
    currentBold = button;
}
const graphFill = (button) => {
    currentGraph.classList.remove("btn-secondary");
    currentGraph.classList.add("btn-outline-secondary");
    button.classList.remove("btn-outline-secondary");
    button.classList.add("btn-secondary");
    currentGraph = button;
}
weightButton.addEventListener("click", () => {
    graphFill(weightButton);
    plotWeight();
});
bmiButton.addEventListener("click", () => {
    graphFill(bmiButton);
    plotWeight();
});

yearButton.addEventListener("click", () => {
    hoverBold(yearButton);
    fillWeightTable();
});
weekButton.addEventListener("click", () => {
    hoverBold(weekButton);
    fillWeightTable();
});
sevenDayButton.addEventListener("click", () => {
    hoverBold(sevenDayButton);
    fillWeightTable();
});
todayButton.addEventListener("click", () => {
    currentInterval = 0;
    fillWeightTable();
});
leftChevron.addEventListener("click", () => {
    currentInterval += 1;
    fillWeightTable();
});
rightChevron.addEventListener("click", () => {
    if (currentInterval > 0) {
        currentInterval -= 1;
        fillWeightTable();
    }
});
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
const fillWeightData = () => {
    const date = new Date();

    dateInput.value = date.getFullYear() + "-" + (date.getMonth()+1) + "-" +  date.getDate();
    timeInput.value = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
const submitWeightData = () => {
    let dt = dateInput.value + "T" + timeInput.value + "Z";
    let weight = weightInput.value

    setWeightData(weight, dt);
    fillWeightTable();
}
const getWeightData = async(range, interval) => {
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

    const res = await fetch(window.location.origin + '/user/getweighttable', tableParam);
    let data = res.json();
    return data;
}
const fillWeightTable = () => {
    let tableBody = document.getElementById("tableBody");
    let dateRangeDisplay = document.getElementById("dateRangeDisplay");
    tableBody.innerHTML = "";
    getWeightData(getRange(currentBold.id), currentInterval).then((data) => {
        let tableData = data["tableData"];
        let dateRange = data["daterange"];
        for (let i = 0; i < tableData.length; i++){
            tr = document.createElement('tr');

            date = document.createElement('td');
            date.innerHTML = tableData[i]["date"];
            time = document.createElement('td');
            time.innerHTML = tableData[i]["time"];
            weight = document.createElement('td');
            weight.innerHTML = tableData[i]["weight"];
            change = document.createElement('td');
            change.innerHTML = tableData[i]["change"]
            bmi = document.createElement('td');
            bmi.innerHTML = tableData[i]["bmi"];

            tr.append(date);
            tr.append(time);
            tr.append(weight);
            tr.append(change);
            tr.append(bmi);
            tableBody.append(tr);
        }
        dateRangeDisplay.innerHTML = dateRange;
    })
    plotWeight();
}
const getRange = (range) => {
    if (range == "sevenDayButton") {
        return 7;
    } else if (range == "weekButton") {
        return 28;
    } else if (range == "yearButton") {
        return 365;
    }
}
const getWeightPlotData = async () => {
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

    const res = await fetch(window.location.origin + '/graph/getweightlinegraph', tableParam);
    let data = res.json();
    return data;
}
const getBmiPlotData = async() => {
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

    const res = await fetch(window.location.origin + '/graph/getbmilinegraph', tableParam);
    let data = res.json();
    return data;
}
const plotWeight = () => {
    if (currentGraph == weightButton){
        getWeightPlotData().then((data) => {
            var data = [{
                x: data["X"],
                y: data["y"]
            }]
            var layout = {
            margin: {l: 30, r: 30, b: 20, t: 10,pad: 0}, 
            }
            Plotly.newPlot(lineChart, data, layout);
        });
    } else if (currentGraph == bmiButton) {
        getBmiPlotData().then((data) => {
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
}

fillWeightTable();

addWeightButton.addEventListener("click", fillWeightData);
submit.addEventListener("click", submitWeightData)
