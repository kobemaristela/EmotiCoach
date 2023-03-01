from django.urls import path
from .views import SessionData, SetSessionData, GetAllSessions

urlpatterns = [
    path('sessiondata', SessionData.as_view()),
    path('setsessiondata', SetSessionData.as_view()),
    path('getallsessions', GetAllSessions.as_view()),
]