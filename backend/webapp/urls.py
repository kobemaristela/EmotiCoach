from django.urls import path, include
from .views import Home, Login

urlpatterns = [
    path('', Home.as_view(), name="home"),
    path('login', Login.as_view(), name="login"),
]