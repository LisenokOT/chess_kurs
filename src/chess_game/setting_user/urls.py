from django.contrib.auth import views
from django.urls import path

from .views import *

urlpatterns = [
    path('setting/', ind_set, name='setting'),
    path('setting/change_style/', change_style, name='change_style'),
    path('setting/change_style_figure/', change_style_figure, name='change_style_figure'),
    path('setting/change_style_board/', change_style_board, name='change_style_board'),
    
]