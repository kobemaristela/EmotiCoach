from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Friend(models.Model):
    auth_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='auth_user')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend')
    pending = models.BooleanField(default=True)

    class Meta:
        unique_together = ('auth_user', 'friend')

class Message(models.Model):
    auth_user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    message = models.TextField()
    topic = models.CharField(max_length=42)