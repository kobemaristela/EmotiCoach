from django.shortcuts import render
import paho.mqtt.client as mqtt
from datetime import datetime
from time import time, sleep
from mqtt.mqtt import ppg_infrared, eda, label
from django.http import JsonResponse
import pandas as pd
import numpy as np
from sklearn.svm import OneClassSVM
from sklearn.preprocessing import StandardScaler
from ml.models import Parameters


def Parse_Data(request):
    if request.method == "GET":
        del eda[:]

        sleep(30)

        eda_list = np.array(np.matrix(eda)[:, 1])
        
        clf = OneClassSVM(nu=.2).fit(eda_list)
        y = clf.predict(eda_list)

        upper_support = max(eda_list[y==1])
        lower_support = min(eda_list[y==1])

        parameters = Parameters.objects.filter(auth_user_id=request.user.id)

        if parameters:
            parameters.update(upper_bound=upper_support, lower_bound=lower_support)
        else:
            Parameters.objects.create(auth_user_id=request.user.id, upper_bound=upper_support, lower_bound=lower_support)

        return JsonResponse({"response": "success"})



def OnFinger(request):
    if request.method == "GET":
        infrared = np.array(ppg_infrared)[2:]
        # infrared = infrared
        # signals = pd.concat([eda, infrared], axis=1)
        # signals.index = signals.index.map(lambda x: x[:-5])
        # signals = signals.sort_index()
        # signals = signals.groupby(signals.index).mean()
        # last_signal = signals.iloc[-1]

        last_infrared = infrared[-1, 1]


        if float(last_infrared) < 1300:
            return JsonResponse({"response": "Off"})
        else:
            return JsonResponse({"response": "On"})
        
def Arousal_Level(request):
    if request.method == "GET":
        eda_list = np.array(eda)[2:] 

        last_eda = float(eda_list[-1, 1])
        
        parameters = Parameters.objects.get(auth_user_id=request.user.id)
        upper_bound = float(parameters.upper_bound)
        lower_bound = float(parameters.lower_bound)
        if last_eda > upper_bound:
            return JsonResponse({"response": "Above"})
        elif last_eda < lower_bound:
            return JsonResponse({"response": "Below"})
        else:
            return JsonResponse({"response": "Average"})