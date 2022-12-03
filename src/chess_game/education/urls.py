from django.contrib.auth import views
from django.urls import path

from .views import *

urlpatterns = [
    path('les1/', less1, name='lesson_1'),
    path('les2/', less2, name='lesson_2'),
    path('les3/', less3, name='lesson_3'),
    path('les4/', less4, name='lesson_4'),
    path('les5/', less5, name='lesson_5'),
]