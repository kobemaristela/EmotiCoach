import matplotlib.pyplot as plt
import matplotlib.animation as animation
from dotenv import load_dotenv
import paho.mqtt.client as mqtt
from time import time
import os
import numpy as np

load_dotenv()

MQTT_SERVER = os.environ.get("MQTT_SERVER")
MQTT_PORT = int(os.environ.get("MQTT_PORT"))
MQTT_KEEPALIVE = int(os.environ.get("MQTT_KEEPALIVE"))
MQTT_USER = os.environ.get("MQTT_USER","")  # default blank
MQTT_PASSWORD = os.environ.get("MQTT_PASSWORD","") # default blank


ppg_infrared = [[0,0],[0,0]]
ppg_red = list()
ppg_green = list()

def on_connect(mqtt_client, userdata, flags, rc):
   if rc == 0:
       print('Connected successfully')
       mqtt_client.subscribe('emoticoach/ppg/infrared')
       mqtt_client.subscribe('emoticoach/ppg/red')
       mqtt_client.subscribe('emoticoach/ppg/green')
   else:
       print('Bad connection. Code:', rc)

def on_message(mqtt_client, userdata, msg):
#    print(f'Received message on topic: {msg.topic} with payload: {msg.payload}')
    message = float(msg.payload[1:])
    if msg.topic == "emoticoach/ppg/infrared":
        ppg_infrared.append([time(), message])
        if len(ppg_infrared) >= 100:
            ppg_infrared.pop(0)
    if msg.topic == "emoticoach/ppg/red":
        ppg_red.append([time(), message])
        if len(ppg_red) >= 100:
            ppg_red.pop(0)
    if msg.topic == "emoticoach/ppg/green":
        ppg_green.append([time(), message])
        if len(ppg_green) >= 100:
            ppg_green.pop(0)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.tls_set(ca_certs="../../certs/isrgrootx1.pem")
client.username_pw_set(MQTT_USER, MQTT_PASSWORD)
client.connect(
    host=MQTT_SERVER,
    port=MQTT_PORT,
    keepalive=MQTT_KEEPALIVE
)

client.loop_start()

fig = plt.figure()
ax1 = fig.add_subplot(1,1,1)


def animate(i):
    ax1.clear()
    ppg_infrared_data = np.array(ppg_infrared)
    ax1.plot(ppg_infrared_data[:,0],ppg_infrared_data[:,1])

ani = animation.FuncAnimation(fig, animate, interval=100)
plt.show()
