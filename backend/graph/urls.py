from django.urls import path
from .views import displayPPG

urlpatterns = [
    path('displayppg', displayPPG.as_view()),
]