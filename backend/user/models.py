from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    auth_user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    weight_goal = models.FloatField()

class Weight(models.Model):
    datetime = models.DateTimeField(default=timezone.now)
    weight = models.FloatField()
    auth_user = models.ForeignKey(User, on_delete=models.CASCADE)