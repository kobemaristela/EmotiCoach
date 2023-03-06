from django.urls import path
from .views import GetSessionData, SetSessionData, GetAllSessions

urlpatterns = [
    path('getsessiondata', GetSessionData.as_view(), name="getsessiondata"),
    path('setsessiondata', SetSessionData.as_view(), name="setsessiondata"),
    path('getallsessions', GetAllSessions.as_view(), name="getallsessions"),
]