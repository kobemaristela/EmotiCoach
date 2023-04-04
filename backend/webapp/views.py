from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

class Home(LoginRequiredMixin, TemplateView):
    login_url = 'login'
    redirect_field_name = 'redirect_to'
    template_name = "webapp/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['first_name'] = self.request.user.first_name
        context['last_name'] = self.request.user.last_name
        return context

class Login(TemplateView):
    template_name = "webapp/login.html"
    next_page = "webapp/"
    redirect_field_name = 'redirect_to'

    def post(self, request, *args, **kwargs):
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({"Status":"Success"})
        else:
            return JsonResponse({"Status":"Incorrect username or password."}) 