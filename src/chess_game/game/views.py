from django.shortcuts import render
import chess
import chess.svg

def make_board():
    board_ch = chess.Board()
    array = board_ch.fen().split('/')
    board = list()
    for x in range(0,8):
        tmp_objs = list()
        for t in range(0,8):
            cell = {}
            if x%2 == 0:
                if t%2 == 0:
                    cell['color'] = "bg-black"
                else:
                    cell['color'] = "bg-white"
            else:
                if t%2 == 0:
                    cell['color'] = "bg-white"
                else:
                    cell['color'] = "bg-black"
            if len(array[x]) > t:
                if array[x][t].isdigit():
                    cell['fig'] = ""
                else:
                    cell['fig'] = array[x][t]
            tmp_objs.append(cell)
        board.append(list(tmp_objs))
    return board

def index_p(request):
    return render(request, 'index.html', {})

def index_set(request):
    return render(request, 'setting_game.html', {})

def index_log(request):
    return render(request, 'login.html', {})

def index_chess(request):
    contex = {}
    contex['board'] = make_board()
    return render(request, 'chess.html', contex)