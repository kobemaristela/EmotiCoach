from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Parameters(models.Model):
    upper_bound = models.FloatField()
    lower_bound = models.FloatField()
    auth_user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)