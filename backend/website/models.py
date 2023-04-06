from django.db import models

# Create your models here.
class Api(models.Model):
    type = models.CharField(max_length=15)
    address = models.CharField(max_length=100)
    parameters = models.TextField()

    def __str__(self):
        return self.address