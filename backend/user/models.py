from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.
class Icon(models.Model):
    image = models.TextField()

class UserProfile(models.Model):
    auth_user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    weight_goal = models.FloatField()
    height = models.FloatField(default=0)
    profile_picture = models.ForeignKey(Icon, on_delete=models.CASCADE, default=1)

class Weight(models.Model):
    datetime = models.DateTimeField(default=timezone.now)
    weight = models.FloatField()
    auth_user = models.ForeignKey(User, on_delete=models.CASCADE)