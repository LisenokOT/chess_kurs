from django.shortcuts import render
from django.http import JsonResponse
import chess
import chess.svg
import accounts.models
from setting_user.get_session_style import *


def make_board(request):
    if get_style_board(request)=="1":
        temp_w = "bg-white1"
        temp_b = "bg-black1"
    else:
        temp_w = "bg-white2"
        temp_b = "bg-black2"
    board_ch = chess.Board()
    array = board_ch.fen().split('/')
    board = list()
    for x in range(0,8):
        tmp_objs = list()
        for t in range(0,8):
            cell = {}
            cell['id'] = x*8 + (t + 1)
            if x%2 == 0:
                if t%2 == 0:
                    cell['color'] = temp_b
                else:
                    cell['color'] = temp_w
            else:
                if t%2 == 0:
                    cell['color'] = temp_w
                else:
                    cell['color'] = temp_b
            if len(array[x]) > t:
                if array[x][t].isdigit():
                    cell['fig'] = ""
                else:
                    cell['fig'] = array[x][t]
            tmp_objs.append(cell)
        board.append(list(tmp_objs))
    return board

def index_p(request):
    return render(request, 'index.html', {'sty_sess': get_style(request)})

def index_set(request):
    return render(request, 'setting_game.html', {'sty_sess': get_style(request)})

def index_chess(request):
    contex = {}
    contex['board'] = make_board(request)
    contex['sty_sess'] = get_style(request)
    contex['sty_sess_f'] = get_style_figure(request)
            # return JsonResponse(data)
    return render(request, 'chess.html', contex)

def move(request):
    print("eee")
    contex = {}
    if True:
    # if chess.Move.from_uci("g2g3") in board.legal_moves:
        # contex['board'] = move_f(request)
        # contex['sty_sess'] = get_style(request)
        # contex['sty_sess_f'] = get_style_figure(request)
        return render(request, 'chess.html', contex)
    else:
        return render(request, 'chess.html', contex)


def index_edu(request):
    return render(request, 'education.html', {'sty_sess': get_style(request)})