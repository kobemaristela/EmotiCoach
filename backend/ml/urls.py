from django.urls import path
from .views import *

urlpatterns = [
    path('parse', Parse_Data),
    path('onfinger', OnFinger),
    path('arousal', Arousal_Level),
]