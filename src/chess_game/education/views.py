from django.shortcuts import render
from setting_user.get_session_style import *

# Create your views here.
def less1(request):
    return render(request, 'lesson_1.html', {'sty_sess': get_style(request)})

def less2(request):
    return render(request, 'lesson_2.html', {'sty_sess': get_style(request)})

def less3(request):
    return render(request, 'lesson_3.html', {'sty_sess': get_style(request)})

def less4(request):
    return render(request, 'lesson_4.html', {'sty_sess': get_style(request)})

def less5(request):
    return render(request, 'lesson_5.html', {'sty_sess': get_style(request)})