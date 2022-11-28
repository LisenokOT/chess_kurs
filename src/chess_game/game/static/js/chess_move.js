var map = new Array(64), count_stroke = 0, colorStroke = "white", my_color = localStorage.getItem('my_color'), time_1 = localStorage.getItem('time'), 
time_2 = localStorage.getItem('time'), extra_time = localStorage.getItem('extra_time'), first_timer = new Date(), second_timer = new Date();

map = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 
'0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P','R', 'N', 'B', 'Q', 'K', 
'B', 'N', 'R']
const list_stroke = [];
list_stroke[count_stroke] = Object.assign({}, map);


$(function () {
    table_create();
    setDraggable();
    setDroppable();
});

function setDraggable() {
    $('.figure-white').draggable();
    $('.figure-black').draggable();
}

function setDroppable() {
    $('.square').droppable({
        drop: function (event, ui) {
            let fromPoly = ui.draggable.attr('name');
            let toPoly = this.id;
            moveFigure(fromPoly, toPoly);
        }
    })
}


// Движение фигур

function moveFigure(fromPoly, toPoly){
    let poly = document.getElementById(fromPoly);
    let newPoly = document.getElementById(toPoly);
    let elem = poly.innerHTML.replace(fromPoly, toPoly).replace(/position: relative; [\w\s-;: ]+/, 'position: relative;');
    let fig = map[fromPoly].toLowerCase();
    poly.innerHTML = "";
    newPoly.innerHTML = elem;
    map[toPoly] = map[fromPoly];
    map[fromPoly] = '0';
    count_stroke += 1;
    list_stroke[count_stroke] = Object.assign({}, map);
    elem = elem.replace(toPoly, fromPoly);
    poly.innerHTML = elem;
    setDraggable();
}


function table_create(){
    console.log('table');
    let table = document.createElement("table");
    table.className = "table_chess";
    let container = document.getElementsByClassName("container_chess")[0];
    for (let i = 0; i < 8; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 8; j++) {
            let td = document.createElement('td');
            if (i%2 == j%2) {
                td.className = "square white";
                td.id = String(i * 8 + j);
                td.innerHTML = "";
            }
            else {
                td.className = "square black";
                td.id = String(i * 8 + j);
                td.innerHTML = "";
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    container.appendChild(table);
    figure_create();
}

function figure_create() {
    console.log('figure');
    for (let i = 0; i < 64; i++) {
        let tds = document.getElementById(i);
        tds.innerHTML = "";
        tds.innerHTML = getFigures(map[i], i);
    }
    setDraggable();
}

function getFigures(figure, cord){
    if(localStorage.getItem('figure') == "images"){
        switch (figure){
            case 'k' : return "<div class='figure-black' name='$cord'><img src='{% static 'images/black_king.png' %} width='60px' height='60px'></div>".replace('$cord', cord);
            case 'q' : return "<div class='figure-black' name='$cord'><img src='{% static 'images/black_queen.png' %} width='60px' height='60px'></div>".replace('$cord', cord);
            case 'r' : return "<div class='figure-black' name='$cord'><img src='{% static 'images/black_rock.png' %} width='60px' height='60px'></div>".replace('$cord', cord);
            case 'n' : return "<div class='figure-black' name='$cord'><img src='{% static 'images/black_knight.png' %} width='60px' height='60px'></div>".replace('$cord', cord);
            case 'b' : return "<div class='figure-black' name='$cord'><img src='{% static 'images/black_bishop.png' %} width='60px' height='60px'></div>".replace('$cord', cord);
            case 'p' : return "<div class='figure-black' name='$cord'><img src='{% static 'images/black_pawn.png' %} width='60px' height='60px'></div>".replace('$cord', cord);

            case 'K' : return "<div class='figure-white' name='$cord'><img src='{% static 'images/white_king.png' %} width='60px' height='60px'></div>".replace('$cord', cord);
            case 'Q' : return "<div class='figure-white' name='$cord'><img src='{% static 'images/white_queen.png' %} width='60px' height='60px'></div>".replace('$cord', cord);
            case 'R' : return "<div class='figure-white' name='$cord'><img src='{% static 'images/white_rock.png' %} width='60px' height='60px'></div>".replace('$cord', cord);
            case 'N' : return "<div class='figure-white' name='$cord'><img src='{% static 'images/white_knight.png' %} width='60px' height='60px'></div>".replace('$cord', cord);
            case 'B' : return "<div class='figure-white' name='$cord'><img src='{% static 'images/white_bishop.png' %} width='60px' height='60px'></div>".replace('$cord', cord);
            case 'P' : return "<div class='figure-white' name='$cord'><img src='{% static 'images/white_pawn.png' %} width='60px' height='60px'></div>".replace('$cord', cord);
            case '0' : return "";
        }
    }
    else if (localStorage.getItem('figure') == "ascii"){
        switch (figure){
            case 'k' : return "<div class='figure-black' name='$cord' style='padding-bottom: 20px'>&#9818;</div>".replace('$cord', cord);
            case 'q' : return "<div class='figure-black' name='$cord' style='padding-bottom: 20px'>&#9819;</div>".replace('$cord', cord);
            case 'r' : return "<div class='figure-black' name='$cord' style='padding-bottom: 20px'>&#9820;</div>".replace('$cord', cord);
            case 'n' : return "<div class='figure-black' name='$cord' style='padding-bottom: 20px'>&#9822;</div>".replace('$cord', cord);
            case 'b' : return "<div class='figure-black' name='$cord' style='padding-bottom: 20px'>&#9821;</div>".replace('$cord', cord);
            case 'p' : return "<div class='figure-black' name='$cord' style='padding-bottom: 15px'>&#9823;</div>".replace('$cord', cord);

            case 'K' : return "<div class='figure-white' name='$cord' style='padding-bottom: 20px'>&#9812;</div>".replace('$cord', cord);
            case 'Q' : return "<div class='figure-white' name='$cord' style='padding-bottom: 20px'>&#9813;</div>".replace('$cord', cord);
            case 'R' : return "<div class='figure-white' name='$cord' style='padding-bottom: 20px'>&#9814;</div>".replace('$cord', cord);
            case 'N' : return "<div class='figure-white' name='$cord' style='padding-bottom: 20px'>&#9816;</div>".replace('$cord', cord);
            case 'B' : return "<div class='figure-white' name='$cord' style='padding-bottom: 20px'>&#9815;</div>".replace('$cord', cord);
            case 'P' : return "<div class='figure-white' name='$cord' style='padding-bottom: 20px'>&#9817;</div>".replace('$cord', cord);
            case '0' : return "";
        }
    }
}