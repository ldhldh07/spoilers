from django.urls import path
from . import views

urlpatterns = [
    path('<int:comment_pk>/', views.comment_update),
    path('<int:movie_pk>/comments/',views.comment_create),
    path('<int:movie_pk>/wish/',views.wish),
]

