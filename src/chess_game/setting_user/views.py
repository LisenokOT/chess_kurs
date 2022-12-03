from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from .get_session_style import *

def change_style(request):
    if request.POST.get('style_setting'):
        request.session["style_setting"] = str(request.POST.get('style_setting'))
        return redirect('/seting/setting')

def change_style_figure(request):
    if request.POST.get('style_setting_figure'):
        request.session["style_setting_figure"] = str(request.POST.get('style_setting_figure'))
        return redirect('/seting/setting')

def change_style_board(request):
    if request.POST.get('style_setting_board'):
        request.session["style_setting_board"] = str(request.POST.get('style_setting_board'))
        return redirect('/seting/setting')

def ind_set(request):
    return render(request, 'set.html', {'sty_sess': get_style(request)}) 

