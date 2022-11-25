from rest_framework import serializers
from .models import Comment
from accounts.serializers import UserCommentSerializer


class CommentParentSerializer(serializers.ModelSerializer):
    user = UserCommentSerializer(read_only=True)

    class Meta:
        model = Comment
        exclude = ('parent',)


class CommentSerializer(serializers.ModelSerializer):
    user = UserCommentSerializer(read_only=True)
    replies = CommentParentSerializer(many=True, read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'title', 'content', 'created_at', 'user', 'parent', 'replies')
        read_only_fields = ('movie', 'parent')
