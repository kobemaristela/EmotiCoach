from django.urls import path
from .views import *

urlpatterns = [
    path('getsessiondata', GetSessionData.as_view(), name="getsessiondata"),
    path('setsessiondata', SetSessionData.as_view(), name="setsessiondata"),
    path('getallsessions', GetAllSessions.as_view(), name="getallsessions"),
    path('deletesessiondata', DeleteSessionData.as_view(), name="deletesessiondata"),
    path('editsession', EditSession.as_view(), name="editsession"),
    path('editactivity', EditActivity.as_view(), name="editactivity"),
    path('deleteactivity', DeleteActivity.as_view(), name="deleteactivity"),
    path('editset', EditSet.as_view(), name="editset"),
    path('deleteset', DeleteSet.as_view(), name="deleteset"),
]