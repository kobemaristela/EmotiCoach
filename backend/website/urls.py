from django.urls import path, include
from .views import Home, Team, Affiliations, Resources

urlpatterns = [
    path('', Home.as_view(), name="home"),
    path('team', Team.as_view(), name="team"),
    path('affiliations', Affiliations.as_view(), name="affiliations"),
    path('resources', Resources.as_view(), name="resources"),
]