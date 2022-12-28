from django.contrib.auth import logout, login
from django.shortcuts import render, redirect
from django.views.generic import CreateView
from django.contrib.auth.views import LoginView
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.contrib.auth.decorators import login_required
from setting_user.get_session_style import *
from .forms import *
from .models import *
 
class RegisterUser(CreateView):
    form_class = RegisterUserForm
    template_name = 'register.html'
    success_url = reverse_lazy('/account/authorization')

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs) | {'sty_sess': get_style(self.request)}
        return dict(list(context.items()))

    def form_valid(self, form):
        context = {'sty_sess': get_style(self.request)}
        user = form.save()
        login(self.request, user)
        reiting = ChessReiting(
            author=user,
            reiting=1500
        )
        reiting.save()
        return redirect('/account/authorization')

class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'login.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs) | {'sty_sess': get_style(self.request)}
        return dict(list(context.items()))

    def get_success_url(self):
        context = {'sty_sess': get_style(self.request)}
        return reverse_lazy('home')


def logout_user(request):
    context = {'sty_sess': get_style(request)}
    logout(request)
    return redirect('/account/authorization')


@login_required
def profile(request):
    context = {
        'reiting': ChessReiting.objects.get(author=request.user),
        'sty_sess': get_style(request)
    }
    return render(request, 'profile.html', context)
