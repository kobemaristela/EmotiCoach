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
    chest = models.BooleanField(default=False, null=True)
    tricep = models.BooleanField(default=False, null=True)
    bicep = models.BooleanField(default=False, null=True)
    shoulder = models.BooleanField(default=False, null=True)
    upper_back = models.BooleanField(default=False, null=True)
    lower_back = models.BooleanField(default=False, null=True)
    quadricep = models.BooleanField(default=False, null=True)
    hamstring = models.BooleanField(default=False, null=True)
    glute = models.BooleanField(default=False, null=True)
    calve = models.BooleanField(default=False, null=True)
    abdominal = models.BooleanField(default=False, null=True)

class Set(models.Model):
    set_num = models.IntegerField()
    weight = models.FloatField()
    reps = models.IntegerField()
    rpe = models.IntegerField()
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)