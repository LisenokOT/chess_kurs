from django.contrib.auth import views
from django.urls import path

from .views import *

urlpatterns = [
    path('authorization/', LoginUser.as_view(), name='authorization'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('logout/', logout_user, name='logout'),
    path('profile/', profile, name='profile'),
]