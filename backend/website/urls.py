from django.urls import path, include
from .views import Home, Team, About, Resources, Docs

urlpatterns = [
    path('', Home.as_view(), name="main"),
    path('team', Team.as_view(), name="team"),
    path('about', About.as_view(), name="about"),
    path('resources', Resources.as_view(), name="resources"),
    path('docs', Docs.as_view(), name="docs"),
]