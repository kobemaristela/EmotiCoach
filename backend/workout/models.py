from django.db import models
from django.utils import timezone

# Create your models here.

class Session(models.Model):
    name = models.CharField(max_length=50)
    duration = models.FloatField()
    datetime = models.DateTimeField(default=timezone.now())

class Activity(models.Model):
    name = models.CharField(max_length=50)
    sets = models.IntegerField()
    session = models.ForeignKey(Session, on_delete=models.CASCADE)

class Set(models.Model):
    set_num = models.IntegerField()
    weight = models.FloatField()
    reps = models.IntegerField()
    rpe = models.IntegerField()
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)