from django.urls import path
from .views import *

urlpatterns = [
    path('getheartratedata', getHeartrateData.as_view()),
    path('getvolumedata', GetVolumeData.as_view()),
    path('getmusclegroupdata', GetMuscleGroupData.as_view()),
    path('getonermdata', GetOneRMData.as_view()),
    path('getpievolumedata', GetPieVolumeData.as_view()),
    path('getactivityheatmap', GetActivityHeatmap.as_view()),
    path('getweightlinegraph', GetWeightLineGraph.as_view()),
    path('getbmilinegraph', GetBmiLineGraph.as_view()),
    path('getwaterlinegraph', GetWaterLineGraph.as_view()),
    path('getsleeplinegraph', GetSleepLineGraph.as_view()),
]