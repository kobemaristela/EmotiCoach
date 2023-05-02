var mqtt;
var host="emotimqtt.maristela.net";
var port=8083;
const lineChart = document.getElementById("lineChart");
var count = 0;

var layout = {
    margin: {l: 30, r: 30, b: 20, t: 10,pad: 0}, 
    }

// Generate a random client ID
clientID = "EmotiCoachWeb-" + parseInt(Math.random() * 100);

// Console clientID, host, port
console.log(clientID + " connecting to " + host + ":" + port);

// Initialize connection
mqtt = new Paho.MQTT.Client("emotimqtt.maristela.net", 8083, clientID);
mqtt.onMessageArrived = onMessageArrived;

// Connect the client, if successful, call onConnect function
mqtt.connect({ 
    useSSL: true,
    userName: "emoticoach",
    password: "7bf#oV&dq2HTLjG6",
    onSuccess: onConnect,
});

//Setup Plot
Plotly.newPlot(lineChart, [{
    x: [],
    y: [],
}], layout);


// Called when the client connects
function onConnect() {
    console.log("Connected to MQTT!");
    // Subscribe to the requested topic
    mqtt.subscribe("emoticoach/eda/activity");
}

// Called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);
   
    const time = new Date();
    const update = {
        x: [[time.getSeconds()]],
        y: [[parseFloat(message.payloadString)]]
    };

    const layout = {
    margin: {l: 30, r: 30, b: 20, t: 10, pad: 0}, 
    };
    
    console.log("before");
    Plotly.extendTraces(lineChart, {
        x: [[time]],
        y: [[message.payloadString]]
    },
    [0]);
    count++;

    if (count > 200) {
        Plotly.newPlot(lineChart, [{
            x: [],
            y: [],
        }], layout);
        count = 0;
    }
    console.log(count);
}

