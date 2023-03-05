from django.urls import path
from .views import SessionData, SetSessionData, GetAllSessions

urlpatterns = [
    path('sessiondata', SessionData.as_view(), name="sessiondata"),
    path('setsessiondata', SetSessionData.as_view(), name="setsessiondata"),
    path('getallsessions', GetAllSessions.as_view(), name="getallsessions"),
]