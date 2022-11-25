from django.db import models

# Create your models here.
class Actor(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)

class Genre(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)

class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    movie_title = models.TextField()
    date_opened = models.DateField()
    overview = models.TextField() 
    popularity = models.FloatField() 
    trailer_key = models.TextField()
    poster_path = models.CharField(max_length=200)
    starring = models.ManyToManyField(Actor, related_name='filmography')
    genres_of_movie = models.ManyToManyField(Genre, related_name='movies_of_genre')

class ReviewVideo(models.Model):
    video_title = models.TextField()
    video_id = models.TextField()
    video_date = models.TextField()
    channel_name = models.TextField()
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE) 