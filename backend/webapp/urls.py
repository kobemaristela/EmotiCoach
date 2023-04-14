from django.urls import path, include
from .views import *

urlpatterns = [
    path('', Home.as_view(), name="home"),
    path('login', Login.as_view(), name="login"),
    path('profile', Profile.as_view(), name="profile"),
    path('register', Register.as_view(), name="register"),
    path('account', Account.as_view(), name="account"),
    path('activity', Activity.as_view(), name="activity"),
    path('activity/chart', ActivityChart.as_view(), name="activitychart"),
]