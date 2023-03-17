from django.urls import path
from .views import Update

urlpatterns = [
    path('', Update().as_view(), name="update"),
]
