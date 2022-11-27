from django.shortcuts import render
import chess
import chess.svg
from django import template

def figur(f):
    if f == 'p':
        return "black_pawn.png"
    elif f == 'k':
        return "black_king.png"
    elif f == 'r':
        return "black_rock.png"
    elif f == 'b':
        return "black_bishop.png"
    elif f == 'n':
        return "black_knight.png"
    elif f == 'q':
        return "black_queen.png"
    elif f == 'K':
        return "white_king.png"
    elif f == 'R':
        return "white_rock.png"
    elif f == 'B':
        return "white_bishop.png"
    elif f == 'N':
        return "white_knight.png"
    elif f == 'Q':
        return "white_queen.png"
    elif f == 'P':
        return "white_pawn.png"
    return None

def make_board():
    board = list()
    for x in range(0,8):
        tmp_objs = list()
        for t in range(0,8):
            if x%2 == 0:
                if t%2 == 0:
                    cell_obj = "bg-black"
                else:
                    cell_obj = "bg-white"
            else:
                if t%2 == 0:
                    cell_obj = "bg-white"
                else:
                    cell_obj = "bg-black"
            tmp_objs.append(cell_obj)
        board.append(list(tmp_objs))
    return board

def figure(board_ch):
    i = j = 0
    data = list()
    tmp = list()
    for string in board_ch.fen().split('/'):
        i += 1
        for temp in string:
            if temp.isdigit():
                j += int(temp) - 1
            else:
                cell = figur(j)
                j += 1
            tmp.append(cell)
        data.append(list())
    return data


def index_p(request):
    return render(request, 'index.html', {})

def index_set(request):
    return render(request, 'setting_game.html', {})

def index_log(request):
    # if request.method == 'POST':
    #     with open('/example.txt') as f:
    #         f.write(request.POST['login'])
    #         f.write(request.POST['password'])
        # render(request, 'setting_game.html')
    return render(request, 'login.html', {})

register = template.Library()

@register.filter()
def range(y):
    return range(1, y)


def index_chess(request):
    board_ch = chess.Board()
    contex = {}
    contex['tr'] = range(1, 8)
    contex['figure'] = figure(board_ch)
    contex['board'] = make_board()
    return render(request, 'chess.html', contex)