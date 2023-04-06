from django.shortcuts import render
from django.views.generic.base import TemplateView
from .models import Api

# Create your views here.
class Home(TemplateView):
    template_name = "website/home.html"

class Team(TemplateView):
    template_name = "website/team.html"

class Affiliations(TemplateView):
    template_name = "website/affiliations.html"

class Resources(TemplateView):
    template_name = "website/resources.html"

class Docs(TemplateView):
    template_name = "website/docs.html"
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['api'] = Api.objects.all()
        
        return context