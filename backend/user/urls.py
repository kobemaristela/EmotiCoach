from django.urls import path
from .views import *
from .apiview import *


urlpatterns = [
    path('login', Login.as_view(), name="login"),
    path('register', Register.as_view(), name="register"),
    path('logout', Logout.as_view(), name="logout"),
    path('delete', DeleteAccount.as_view(), name="delete"),
    path('edit', EditAccount.as_view(), name="edit"),
    path('authenticate', AuthenticateUser.as_view(), name="authenticate"),
    path('getprofile', GetProfile.as_view(), name="getprofile"),
    
    path('createicon', CreateIcon.as_view(), name="createicon"),
    path('getallicons', GetAllIcons.as_view(), name="getallicons"),
    path('setweight', SetWeight.as_view(), name="setweight"),
    path('getweighttable', GetWeightTable.as_view(), name="getweighttable"),
    path('showDb', show_database)
]