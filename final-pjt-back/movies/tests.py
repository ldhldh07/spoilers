from rest_framework import serializers
from .models import Movie, Actor, Genre
from community.serializers import CommentSerializer


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Genre
        fields = '__all__'


class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('id','movie_title', 'overview', 'poster_path')


class MovieSerializer(serializers.ModelSerializer):
    starring = ActorSerializer(many=True)
    genres_of_movie = GenreSerializer(many=True)
    comment_set = CommentSerializer(many=True)

    class Meta:
        model = Movie
        fields = '__all__'

