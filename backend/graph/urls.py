from django.urls import path
from .views import *

urlpatterns = [
    path('getheartratedata', getHeartrateData.as_view()),
    path('getvolumedata', GetVolumeData.as_view()),
    path('getmusclegroupdata', GetMuscleGroupData.as_view())
]