from django.urls import path
from .views import *

urlpatterns = [
    path('getsession', GetSession.as_view(), name="getsession"),
    path('setsession', SetSession.as_view(), name="setsession"),
    path('getallsessions', GetAllSessions.as_view(), name="getallsessions"),
    path('deletesession', DeleteSession.as_view(), name="deletesession"),
    path('editsession', EditSession.as_view(), name="editsession"),

    path('setactivity', SetActivity.as_view(), name="setactivity"),
    path('editactivity', EditActivity.as_view(), name="editactivity"),
    path('deleteactivity', DeleteActivity.as_view(), name="deleteactivity"),

    path('setset', SetSet.as_view(), name="setset"),
    path('editset', EditSet.as_view(), name="editset"),
    path('deleteset', DeleteSet.as_view(), name="deleteset"),

    path('getmusclegroups', GetMuscleGroups.as_view(), name="getmusclegroups"),
    path('getactivitynames', GetActivityNames.as_view(), name="getactivitynames"),
]