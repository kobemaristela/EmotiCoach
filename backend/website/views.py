from django.shortcuts import render
from django.views.generic.base import TemplateView
from .models import Api
from django.shortcuts import redirect

# Create your views here.
class Home(TemplateView):
    template_name = "index.html"

class Team(TemplateView):
    template_name = "team.html"

class About(TemplateView):
    template_name = "about.html"

class Resources(TemplateView):
    template_name = "resources.html"

class Docs(TemplateView):
    template_name = "docs.html"
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['api'] = Api.objects.all()
        
        return context