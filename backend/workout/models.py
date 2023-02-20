from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class Session(models.Model):
    name = models.CharField(max_length=50)
    duration = models.FloatField()
    datetime = models.DateTimeField(default=timezone.now)
    auth_user = models.ForeignKey(User, on_delete=models.CASCADE)

class Activity(models.Model):
    name = models.CharField(max_length=50)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)

class MuscleGroup(models.Model):
    activity = models.OneToOneField(Activity, on_delete=models.CASCADE)
    chest = models.BooleanField()
    tricep = models.BooleanField()
    bicep = models.BooleanField()
    shoulder = models.BooleanField()
    upper_back = models.BooleanField()
    lower_back = models.BooleanField()
    quadricep = models.BooleanField()
    hamstring = models.BooleanField()
    glute = models.BooleanField()
    calve = models.BooleanField()
    abdominal = models.BooleanField()

class Set(models.Model):
    set_num = models.IntegerField()
    weight = models.FloatField()
    reps = models.IntegerField()
    rpe = models.IntegerField()
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)