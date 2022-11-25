from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token


# Create your views here.

@api_view(['POST'])
def user_detail(request):
    if request.data.get('key'):
        key = request.data.get('key')
        token = get_object_or_404(Token, key=key)
        user_pk = token.user_id
        user = get_object_or_404(get_user_model(), pk=user_pk)
    elif request.data.get('username'):
        username = request.data.get('username')
        user = get_object_or_404(get_user_model(), username=username)

    serializer = UserSerializer(user)
    return Response(serializer.data)

# @api_view(['POST'])
# def signup(request):
#     if request.user.is_authenticated:
#         return Response(status=status.HTTP_400_BAD_REQUEST)
    
#     password = request.data.get('password')
#     password2 = request.data.get('password2')
#     if password != password2:
#         error_message = {
#             'message' : '비밀번호 불일치'
#         }
#         return Response(error_message, status=status.HTTP_400_BAD_REQUEST)

#     serializer = UserReigistrationSerializer(data=request.data)
    
#     if serializer.is_valid(raise_exception=True):
#         user = serializer.save()
#         token = Token.objects.create(user=user)
#         user.set_password(password)
#         data = {
#             'Token': token.key
#             }
            
#         return Response(data, status=status.HTTP_201_CREATED)

