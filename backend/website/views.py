from django.shortcuts import render
from django.views.generic.base import TemplateView

# Create your views here.
class Home(TemplateView):
    template_name = "website/home.html"

class Team(TemplateView):
    template_name = "website/team.html"

class Affiliations(TemplateView):
    template_name = "website/affiliations.html"

class Resources(TemplateView):
    template_name = "website/resources.html"