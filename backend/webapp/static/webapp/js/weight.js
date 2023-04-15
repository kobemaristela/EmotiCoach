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