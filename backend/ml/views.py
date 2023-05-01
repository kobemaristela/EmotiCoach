from django.shortcuts import render
import paho.mqtt.client as mqtt
from datetime import datetime
from time import time
from mqtt.mqtt import ppg_infrared, eda, label
# import pandas as pd
import numpy as np


def Parse_Data(request):
    if request.method == "GET":

        infrared_df = pd.DataFrame(ppg_infrared, columns=['time', 'ppg_infrared']).iloc[2:].set_index("time")
        eda_df = pd.DataFrame(eda, columns=['time', 'eda']).iloc[2:].set_index("time")

        signals = pd.concat([eda_df, infrared_df], axis=1)
        print(signals)
        signals.index = signals.index.map(lambda x: x[:])
        signals = signals.sort_index()
        # signals = signals.groupby(signals.index).mean()

        # Save to csv file
        signals.to_csv(path_or_buf="/Users/jaeminbbq/Documents/train.csv")

def OnFinger(request):
    if request.method == "GET":
        infrared = pd.DataFrame(ppg_infrared, columns=['time', 'ppg_infrared']).iloc[2:].set_index("time")
        signals = pd.concat([eda, infrared], axis=1)
        signals.index = signals.index.map(lambda x: x[:-5])
        signals = signals.sort_index()
        signals = signals.groupby(signals.index).mean()
        last_signal = signals.iloc[-1]

        if last_signal["ppg_infrared"] < 1300 or last_signal["ppg_infrared"] < 1300:
            print("Off Finger")
        else:
            print("On Finger")
