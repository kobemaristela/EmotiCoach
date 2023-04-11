let oneDayButton = document.getElementById("oneDayButton");
let sevenDayButton = document.getElementById("sevenDayButton");
let weekButton = document.getElementById("weekButton");
let todayButton = document.getElementById("todayButton");
let leftChevron = document.getElementById("leftChevron");
let rightChevron = document.getElementById("rightChevron");
let currentBold = sevenDayButton;

let currentInterval = 0;

sevenDayButton.classList.add("font-weight-bold");

const hoverBold = (button) => {
    currentBold.classList.remove("font-weight-bold");
    button.classList.add("font-weight-bold");
    currentBold = button;
}

oneDayButton.addEventListener("click", () => {
    hoverBold(oneDayButton);
    getTableData(currentInterval, getRange(currentBold.id))
        .then((data) => fillTable(data["table"], data["daterange"]));
});
sevenDayButton.addEventListener("click", () => {
    hoverBold(sevenDayButton);
    getTableData(currentInterval, getRange(currentBold.id))
        .then((data) => fillTable(data["table"], data["daterange"]));
});
weekButton.addEventListener("click", () => {
    hoverBold(weekButton);
    getTableData(currentInterval, getRange(currentBold.id))
        .then((data) => fillTable(data["table"], data["daterange"]));
});

todayButton.addEventListener("click", () => {
    currentInterval = 0;
    getTableData(currentInterval, getRange(currentBold.id))
        .then((data) => fillTable(data["table"], data["daterange"]));
})
leftChevron.addEventListener("click", () => {
    currentInterval += 1;
    getTableData(currentInterval, getRange(currentBold.id))
        .then((data) => fillTable(data["table"], data["daterange"]));
})
rightChevron.addEventListener("click", () => {
    if (currentInterval > 0) {
        currentInterval -= 1;
        getTableData(currentInterval, getRange(currentBold.id))
            .then((data) => fillTable(data["table"], data["daterange"]));
    }
})


const fillTable = (data, range) => {
    let tableBody = document.getElementById("tableBody");
    let dateRangeDisplay = document.getElementById("dateRangeDisplay");
    tableBody.innerHTML = "";
    for (let i = 0; i < data.length; i++){
        tr = document.createElement('tr');

        date = document.createElement('td');
        date.innerHTML = data[i]["date"];
        activity = document.createElement('td');
        activity.innerHTML = data[i]["activity"];
        total_sets = document.createElement('td');
        total_sets.innerHTML = data[i]["total_sets"];
        heaviest_weight = document.createElement('td');
        heaviest_weight.innerHTML = data[i]["heaviest_weight"];
        highest_rpe = document.createElement('td');
        highest_rpe.innerHTML = data[i]["highest_rpe"];
        total_volume = document.createElement('td');
        total_volume.innerHTML = data[i]["total_volume"];

        tr.append(date);
        tr.append(activity);
        tr.append(total_sets);
        tr.append(heaviest_weight);
        tr.append(highest_rpe);
        tr.append(total_volume);

        tableBody.append(tr);
    }

    dateRangeDisplay.innerHTML = range;

    $(document).ready(function() {
        $('#dataTable').DataTable();
      });
}

const getTableData = async(interval, range) => {
    const addData = new FormData();

    addData.append("interval", interval);
    addData.append("range", range);

    let tableParam = {
        method: 'POST',
        headers: {
                  'X-CSRFToken': csrfToken,
                 },
        body: addData,
    };

    const res = await fetch(window.location.origin + '/workout/getactivitytable', tableParam);
    let data = res.json();
    return data;
}

const getRange = (range) => {
    if (range == "oneDayButton") {
        return 1;
    } else if (range == "sevenDayButton") {
        return 7;
    } else if (range == "weekButton") {
        return 28;
    }
}

getTableData(currentInterval, getRange(currentBold.id))
    .then((data) => fillTable(data["table"], data["daterange"]));
