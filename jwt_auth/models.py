from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    profile_name = models.CharField(max_length=50)
    profile_image = models.CharField(max_length=500)
    bio = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.profile_name}"