// MQTT Setup
const host="emotimqtt.maristela.net";
const port=8083;

// Generate a random client ID
clientID = "EmotiCoachWeb-" + parseInt(Math.random() * 100);

// Console clientID, host, port
console.log(clientID + " connecting to " + host + ":" + port);

// Initialize connection
mqtt = new Paho.MQTT.Client("emotimqtt.maristela.net", 8083, clientID);
mqtt.onMessageArrived = onMessageArrived;   // Link message arrive

// Connect the client, if successful, call onConnect function
mqtt.connect({ 
    useSSL: true,
    userName: "emoticoach",
    password: "7bf#oV&dq2HTLjG6",
    onSuccess: onConnect,
});


// Plot Setup
const lineChart = document.getElementById("lineChart");
const layout = {margin: {l: 30, r: 30, b: 20, t: 10, pad: 0}};
var count = 0;
Plotly.newPlot(lineChart, [{x: [], y: []}], layout);

// MQTT Helper Functions
function onConnect() {
    console.log("Connected to MQTT!");
    // Subscribe to the requested topic
    mqtt.subscribe("emoticoach/ppg/infrared");
}

function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);
   
    const time = new Date();
    const update = {
        x: [[time.getSeconds()]],
        y: [[parseFloat(message.payloadString)]]
    };

    Plotly.extendTraces(lineChart, {
        x: [[time]],
        y: [[message.payloadString]]
    },
    [0]);
    count++;

    if (count > 200) {
        Plotly.newPlot(lineChart, [{x: [], y: []}], layout);
        count = 0;
    }
}

