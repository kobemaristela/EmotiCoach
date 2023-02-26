from django.urls import path
from .views import SessionData, SetSessionData

urlpatterns = [
    path('sessiondata', SessionData.as_view()),
    path('setsessiondata', SetSessionData.as_view())
]