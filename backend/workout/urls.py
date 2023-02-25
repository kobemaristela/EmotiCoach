from django.urls import path
from .views import SessionData

urlpatterns = [
    path('sessiondata', SessionData.as_view()),
]