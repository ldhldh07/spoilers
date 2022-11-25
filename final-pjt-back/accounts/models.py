from django.db import models
from django.contrib.auth.models import AbstractUser
from movies.models import Movie

# Create your models here.
class User(AbstractUser):
    is_staff = models.BooleanField(default=False)
    wish_list = models.ManyToManyField(Movie, related_name='wish_users')

