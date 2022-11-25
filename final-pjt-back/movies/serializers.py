from rest_framework import serializers
from .models import Movie, Actor, Genre,ReviewVideo
from accounts.serializers import UserCommentSerializer
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
        fields = ('id','movie_title', 'poster_path','popularity','date_opened','genres_of_movie','starring',)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewVideo
        fields = '__all__'
        read_only_fields = ('movie',)

class MovieSerializer(serializers.ModelSerializer):
    starring = ActorSerializer(many=True)
    genres_of_movie = GenreSerializer(many=True)
    comment_set = CommentSerializer(many=True)
    wish_users = UserCommentSerializer(many=True)
    reviewvideo_set = ReviewSerializer(many=True)

    class Meta:
        model = Movie
        fields = '__all__'

