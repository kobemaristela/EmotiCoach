from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from user.models import UserProfile

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

class Register(TemplateView):
    template_name = "webapp/register.html"
    next_page = "webapp/login"
    redirect_field_name = 'redirect_to'

class Profile(LoginRequiredMixin, TemplateView):
    login_url = 'login'
    redirect_field_name = 'redirect_to'
    template_name = "webapp/profile.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = UserProfile.objects.get(auth_user_id=self.request.user.id)

        context['first_name'] = self.request.user.first_name
        context['last_name'] = self.request.user.last_name
        context['email'] = self.request.user.email
        context['weight_goal'] = user.weight_goal
        context['height'] = user.height
        return context

class Account(LoginRequiredMixin, TemplateView):
    login_url = 'login'
    redirect_field_name = 'redirect_to'
    template_name = "webapp/account.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['first_name'] = self.request.user.first_name
        context['last_name'] = self.request.user.last_name
        context['email'] = self.request.user.email
        return context

class Activity(LoginRequiredMixin, TemplateView):
    login_url = 'login'
    redirect_field_name = 'redirect_to'
    template_name = "webapp/activity.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['first_name'] = self.request.user.first_name
        context['last_name'] = self.request.user.last_name
        return context

class ActivityChart(LoginRequiredMixin, TemplateView):
    login_url = 'login'
    redirect_field_name = 'redirect_to'
    template_name = "webapp/activitychart.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['first_name'] = self.request.user.first_name
        context['last_name'] = self.request.user.last_name
        return context

class Weight(LoginRequiredMixin, TemplateView):
    login_url = 'login'
    redirect_field_name = 'redirect_to'
    template_name = "webapp/weight.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['first_name'] = self.request.user.first_name
        context['last_name'] = self.request.user.last_name
        return context

class Water(LoginRequiredMixin, TemplateView):
    login_url = 'login'
    redirect_field_name = 'redirect_to'
    template_name = "webapp/water.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['first_name'] = self.request.user.first_name
        context['last_name'] = self.request.user.last_name
        return context

class Sleep(LoginRequiredMixin, TemplateView):
    login_url = 'login'
    redirect_field_name = 'redirect_to'
    template_name = "webapp/sleep.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['first_name'] = self.request.user.first_name
        context['last_name'] = self.request.user.last_name
        return context

class PPG(LoginRequiredMixin, TemplateView):
    login_url = 'login'
    redirect_field_name = 'redirect_to'
    template_name = "webapp/ppg.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['first_name'] = self.request.user.first_name
        context['last_name'] = self.request.user.last_name
        return context

class EDA(LoginRequiredMixin, TemplateView):
    login_url = 'login'
    redirect_field_name = 'redirect_to'
    template_name = "webapp/eda.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['first_name'] = self.request.user.first_name
        context['last_name'] = self.request.user.last_name
        return context
