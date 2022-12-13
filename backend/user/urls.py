from django.urls import path, include
from .views import Login, Register, Logout
from user import views

urlpatterns = [
    path('login', Login.as_view()),
    path('register', Register.as_view()),
    path('logout', Logout.as_view()),
    path('showDb', views.show_database)
]