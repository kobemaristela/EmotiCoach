from django.urls import path
from .views import getHeartrateData

urlpatterns = [
    path('getheartratedata', getHeartrateData.as_view()),
]