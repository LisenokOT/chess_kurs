

def get_style(request):
    return request.session.get("style_setting")

def get_style_figure(request):
    return request.session.get("style_setting_figure")

def get_style_board(request):
    return request.session.get("style_setting_board")