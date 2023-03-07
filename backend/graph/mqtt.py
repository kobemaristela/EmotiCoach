import paho.mqtt.client as mqtt
from django.conf import settings
from time import time

ppg_infrared = [[0,0],[0,0]]
ppg_red = [[0,0],[0,0]]
ppg_green = [[0,0],[0,0]]

# Connect to MQTT server
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
        ppg_infrared.append((time(), message))
        if len(ppg_infrared) >= 300:
            ppg_infrared.pop(0)
    if msg.topic == "emoticoach/ppg/red":
        ppg_red.append((time(), message))
        if len(ppg_red) >= 300:
            ppg_red.pop(0)
    if msg.topic == "emoticoach/ppg/green":
        ppg_green.append((time(), message))
        if len(ppg_green) >= 300:
            ppg_green.pop(0)
        


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.tls_set(ca_certs="../certs/isrgrootx1.pem")
client.username_pw_set(settings.MQTT_USER, settings.MQTT_PASSWORD)
client.connect(
    host=settings.MQTT_SERVER,
    port=settings.MQTT_PORT,
    keepalive=settings.MQTT_KEEPALIVE
)

