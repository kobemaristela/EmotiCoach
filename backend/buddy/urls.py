from django.urls import path
from .views import *

urlpatterns = [
    path('addfriend', AddFriend.as_view(), name="addfriend"),
    path('getallfriends', GetAllFriends.as_view(), name="getallfriends"),
]