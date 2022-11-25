from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.models import Movie
from community.models import Comment


class MovieWishListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('id', 'movie_title', 'poster_path',)



class CommentUserSerializer(serializers.ModelSerializer):
    movie = MovieWishListSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'title', 'content', 'created_at', 'movie')


class UserSerializer(serializers.ModelSerializer):
    wish_list = MovieWishListSerializer(many=True)
    comment_set = CommentUserSerializer(many=True)

    class Meta:
        model = get_user_model()
        exclude=('password',)
        write_only_fields = ['password',]


class UserCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields=('id', 'username',)