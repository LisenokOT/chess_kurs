from django.shortcuts import render
import chess
import chess.svg

def index_p(request):
    return render(request, 'index.html', {})

def index_set(request):
    return render(request, 'setting_game.html', {})

def index_log(request):
    return render(request, 'login.html', {})

def index_chess(request):
    board_ch = chess.Board()
    contex = {}
    return render(request, 'chess.html', contex)