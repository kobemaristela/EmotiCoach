from django.views.generic.base import TemplateView

# Create your views here.

class Home(TemplateView):
    template_name = "demo/home.html"