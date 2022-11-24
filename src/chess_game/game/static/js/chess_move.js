$(function () {
    service_start();
    setDroppable();
});

function setDraggable() {
    if (list_stroke.length - 1 == count_stroke) {
        $('.figure-white').draggable();
        $('.figure-black').draggable();
        if (colorStroke == "white") {
            $('.figure-white').draggable('enable');
            $('.figure-black').draggable('disable');
        }
        else {
            $('.figure-white').draggable('disable');
            $('.figure-black').draggable('enable');
        }
    }
    else {
        $('.figure-white').draggable('disable');
        $('.figure-black').draggable('disable');
    }
}

function setDroppable() {
    $('.white').droppable({
        drop: function (event, ui) {
            let fromPoly = ui.draggable.attr('name');
            let toPoly = this.id;
            moveFigure(fromPoly, toPoly);
        }
    })
}

function setDroppable() {
    $('.black').droppable({
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
    if (checkStroke(fig, getColor(fromPoly), fromPoly, toPoly)) {
        poly.innerHTML = "";
        newPoly.innerHTML = elem;
        map[toPoly] = map[fromPoly];
        map[fromPoly] = '0';
        count_stroke += 1;
        list_stroke[count_stroke] = Object.assign({}, map);
        if (colorStroke == "white"){
            if (count_stroke > 2 && localStorage.getItem('time') != 0){
                time_1 += extra_time;
                showTime(colorStroke);
            }
            colorStroke = "black";
        }
        else if (colorStroke == "black"){
            if (count_stroke > 2 && localStorage.getItem('time') != 0){
                time_2 += extra_time;
                showTime(colorStroke);
            }
            colorStroke = "white";
        }
        setDraggable();
    }
    else {
        elem = elem.replace(toPoly, fromPoly);
        poly.innerHTML = elem;
        setDraggable();
    }
}

function checkStroke(fig, color, fromPoly, toPoly){
    switch (fig){
        case "p": return movePawn(color, fromPoly, toPoly);
        case "n": return moveKnight(color, fromPoly, toPoly);
        case "b": return moveBishop(color, fromPoly, toPoly);
        case "r": return moveRook(color, fromPoly, toPoly);
        case "q": return moveQueen(color, fromPoly, toPoly);
        case "k": return moveKing(color, fromPoly, toPoly);
    }
}

function movePawn(color, fromPoly, toPoly){
    let newColor = getColor(toPoly);
    if (newColor == "") {
        if (((fromPoly >= 48 && fromPoly <= 55 && color == "white") || (fromPoly >= 8 && fromPoly <= 15 && color == "black")) 
        && (Math.abs(fromPoly - toPoly)) / 8 == 2 && newColor != color && getFreeLines(fromPoly, toPoly, 2))
            return true;
        else if ((Math.abs(fromPoly - toPoly)) / 8 == 1)
            return true;
        else
            return false;
    }
    else{
        if (Math.round((Math.abs(fromPoly - toPoly)) / 8) == 1 && (Math.abs(fromPoly - toPoly) == 7 || Math.abs(fromPoly - toPoly) == 9) 
        && color != newColor && Math.abs(getRows(toPoly) - getRows(fromPoly)) == 1)
            return true;
        else
            return false;
    }
}

function moveKnight(color, fromPoly, toPoly){
    let newColor = getColor(toPoly);
    if ((Math.abs(fromPoly - toPoly) == 17 || Math.abs(fromPoly - toPoly) == 15) && color != newColor && Math.abs(getRows(toPoly) - getRows(fromPoly)) == 2)
        return true;
    else if ((Math.abs(fromPoly - toPoly) == 6 || Math.abs(fromPoly - toPoly) == 10) && color != newColor && Math.abs(getRows(toPoly) - getRows(fromPoly)) == 1)
        return true;
    else
        return false;

}

function moveBishop(color, fromPoly, toPoly){
    let newColor = getColor(toPoly);
    if (Math.abs(fromPoly - toPoly) % 7 == 0 && color != newColor && getFreeLines(fromPoly, toPoly, 3) && Math.abs(fromPoly - toPoly) / 7 == Math.abs(getRows(toPoly) - getRows(fromPoly)))
        return true;
    else if (Math.abs(fromPoly - toPoly) % 9 == 0 && color != newColor && getFreeLines(fromPoly, toPoly, 4) && Math.abs(fromPoly - toPoly) / 9 == Math.abs(getRows(toPoly) - getRows(fromPoly)))
        return true;
    else
        return false;
}

function moveRook(color, fromPoly, toPoly){
    let newColor = getColor(toPoly);
    if (Math.abs(fromPoly - toPoly) % 8 == 0 && color != newColor && getFreeLines(fromPoly, toPoly, 2))
        return true;
    else if (color != newColor && Math.abs(getRows(toPoly) - getRows(fromPoly)) == 0 && getFreeLines(fromPoly, toPoly, 1))
        return true;
    else
        return false;

}

function moveQueen(color, fromPoly, toPoly){
    let newColor = getColor(toPoly);
    if (color != newColor && Math.abs(getRows(toPoly) - getRows(fromPoly)) == 0 && getFreeLines(fromPoly, toPoly, 1))
        return true;
    else if (Math.abs(fromPoly - toPoly) % 8 == 0 && color != newColor && getFreeLines(fromPoly, toPoly, 2))
        return true;
    else if (Math.abs(fromPoly - toPoly) % 7 == 0 && color != newColor && getFreeLines(fromPoly, toPoly, 3) && Math.abs(fromPoly - toPoly) / 7 == Math.abs(getRows(toPoly) - getRows(fromPoly)))
        return true;
    else if (Math.abs(fromPoly - toPoly) % 9 == 0 && color != newColor && getFreeLines(fromPoly, toPoly, 4) && Math.abs(fromPoly - toPoly) / 9 == Math.abs(getRows(toPoly) - getRows(fromPoly)))
        return true;
    else
        return false;
}

function moveKing(color, fromPoly, toPoly){
    let newColor = getColor(toPoly);
    if (color != newColor && Math.abs(getRows(toPoly) - getRows(fromPoly)) == 1 && Math.abs(toPoly - fromPoly) == 8)
        return true;
    if (color != newColor && Math.abs(getRows(toPoly) - getRows(fromPoly)) == 0 && Math.abs(toPoly - fromPoly) == 1)
        return true;
    else if (Math.abs(fromPoly - toPoly) / 8 == 1 && color != newColor)
        return true;
    else if (Math.abs(fromPoly - toPoly) / 7 == 1 && color != newColor && Math.abs(fromPoly - toPoly) / 7 == Math.abs(getRows(toPoly) - getRows(fromPoly)))
        return true;
    else if (Math.abs(fromPoly - toPoly) / 9 == 1 && color != newColor && Math.abs(fromPoly - toPoly) / 9 == Math.abs(getRows(toPoly) - getRows(fromPoly)))
        return true;
    else
        return false;
}
function setTimer(){
    let enter;
    if (count_stroke == 1){
        first_timer = new Date();
        second_timer = new Date();
    }
    if (count_stroke > 1){
        if (colorStroke == "white"){
            enter = document.getElementById("white_timer");

            if (time_1 <= 0) {
                clearInterval(timer);
                alert("У белых закончилось время");
            } 
            else {
                showTime(colorStroke);
            }
            let tmp = new Date();
            let differ = (tmp.getTime() - first_timer.getTime()) / 1000;
            time_1 -= differ;
            first_timer = new Date();
            second_timer = new Date();
        }
        else if (colorStroke == "black"){
            enter = document.getElementById("black_timer");

            if (time_2 <= 0) {
                clearInterval(timer);
                alert("У чёрных закончилось время");
            } 
            else {
                showTime(colorStroke);
            }
            let tmp = new Date();
            let differ = (tmp.getTime() - second_timer.getTime()) / 1000;
            time_2 -= differ;
            first_timer = new Date();
            second_timer = new Date();
        }
    }
    
}

function showTime(type){
    if (type == "white"){
        enter = document.getElementById("white_timer");
        let enter_time = Math.round(time_1);
        enter.innerHTML = transform_time(enter_time);

        let elem_bar_2 = document.getElementsByClassName("white_time_bar")[0];
        let tmp = parseInt(localStorage.getItem('time')) * 60;
        elem_bar_2.value = Math.round(enter_time / tmp * 100);
    }


    
    if (type == "black"){
        enter = document.getElementById("black_timer");
        let enter_time = Math.round(time_2);
        enter.innerHTML = transform_time(enter_time);

        let elem_bar_1 = document.getElementsByClassName("black_time_bar")[0];
        let tmp = parseInt(localStorage.getItem('time')) * 60;
        elem_bar_1.value = Math.round(enter_time / tmp * 100);
    }
}

function service_start(){
    time_1 = parseInt(time_1) * 60;
    time_2 = parseInt(time_2) * 60;
    if (my_color == "black"){
        let elem = document.getElementsByTagName("td")[0];
        if (elem.id == 0) {
            reverse_board();
        }
    }
    if (localStorage.getItem('time') != 0) {
        let elem_1 = document.getElementsByClassName("timer")[0];
        let elem_2 = document.getElementsByClassName("timer")[1];
        elem_1.style.display = "inline";
        elem_2.style.display = "inline";
        let enter_1 = document.getElementsByClassName("time_enter")[0];
        let enter_2 = document.getElementsByClassName("time_enter")[1];

        let elem_bar_1 = document.getElementsByClassName("black_time_bar")[0];
        let elem_bar_2 = document.getElementsByClassName("white_time_bar")[0];
        elem_bar_1.style.display = "inline";
        elem_bar_2.style.display = "inline";

        extra_time = parseInt(extra_time);
        
        let strTimer = transform_time(time_1);
    
        enter_1.innerHTML = strTimer;
        enter_2.innerHTML = strTimer;
        
        if (my_color == "black"){
            let elem_tim_1 = document.getElementsByClassName("time_enter")[0];
            let elem_tim_2 = document.getElementsByClassName("time_enter")[1];
            let elem_bar_1 = document.getElementsByClassName("black_time_bar")[0];
            let elem_bar_2 = document.getElementsByClassName("white_time_bar")[0];

            elem_tim_1.id = "white_timer";
            elem_tim_2.id = "black_timer";
        
        }
        setInterval('setTimer()', 10);
    }
        
}

function transform_time(time_1){
    seconds = time_1%60
    minutes = time_1/60%60
    hour = time_1/60/60%60
    let strTimer;
    if (time_1 >= 3600){
        if (minutes < 10){
            if (seconds < 10)
                strTimer = `${Math.trunc(hour)}:0${Math.trunc(minutes)}:0${seconds}`;
            else
                strTimer = `${Math.trunc(hour)}:0${Math.trunc(minutes)}:${seconds}`;
        }
        else {
            if (seconds < 10)
                strTimer = `${Math.trunc(hour)}:${Math.trunc(minutes)}:0${seconds}`;
            else
                strTimer = `${Math.trunc(hour)}:${Math.trunc(minutes)}:${seconds}`;
        }
    }
        
    else if (time_1 < 3600){
        if (minutes < 10){
            if (seconds < 10)
                strTimer = `0${Math.trunc(minutes)}:0${seconds}`;
            else
                strTimer = `${Math.trunc(minutes)}:${seconds}`;
        }
        else {
            if (seconds < 10)
                strTimer = `${Math.trunc(minutes)}:0${seconds}`;
            else
                strTimer = `${Math.trunc(minutes)}:${seconds}`;
        }
    }
    else if (time_1 < 60){
        strTimer = `${seconds}`;
        if (seconds < 10)
            strTimer = `0:0${seconds}`;
        else
            strTimer = `0:${seconds}`;
    }
    return strTimer;
}

function stockfish_move() {
    var stockfish = new Worker('/stockfish.js-master/stockfish.js');
    stockfish.postMessage('go depth 15');
    stockfish.onmessage = function(event) {
        console.log(event.data);
    };
}

function generationFen(board){
    let fen = "", RANK_SEPARATOR = "/";
    for (let i = 0; i < 8; i++) {
        let empty = 0;
        let rankFen = "";
        for (let j = 0; j < 8; j++) {
            if(board[i * 8 + j] == 0) {
                empty++;
            }
            else {
                if (empty != 0)
                    rankFen += empty;
                rankFen += board[i * 8 + j];
                empty = 0;
            }
        }
        if (empty != 0) rankFen += empty;
        fen += rankFen;
        if (!(i == 7))
            fen += RANK_SEPARATOR;
        else {
            fen += " ";
        }
    }
    return fen;
}

function back_stroke(){
    if (count_stroke > 0) {
        count_stroke -= 1;
        $('.figure-white').draggable('disable');
        $('.figure-black').draggable('disable');
        map = transformToMap(count_stroke);
        figure_create();
    }
}

function next_stroke(){
    if (count_stroke < list_stroke.length - 1) {
        count_stroke += 1;
        map = transformToMap(count_stroke);
        figure_create();
        setDraggable();
    }
}

function fullBack_stroke(){
    count_stroke = 0;
    $('.figure-white').draggable('disable');
    $('.figure-black').draggable('disable');
    map = transformToMap(count_stroke);
    figure_create();
}

function fullNext_stroke(){
    count_stroke = list_stroke.length - 1;
    map = transformToMap(count_stroke);
    figure_create();
    setDraggable();
}

function reverse_board() {
    for (let i = 0; i < 32; i++){
        let elem_1 = document.getElementById(i);
        let elem_2 = document.getElementById(63 - i);
        elem_1.id = 63 - i;
        elem_2.id = i;
        
    }

    if (localStorage.getItem('time') != 0){

        let elem_tim_1 = document.getElementsByClassName("time_enter")[0];
        let elem_tim_2 = document.getElementsByClassName("time_enter")[1];
        let elem_bar_1 = document.getElementsByClassName("black_time_bar")[0];
        let elem_bar_2 = document.getElementsByClassName("white_time_bar")[0];
        elem_bar_1.className = "white_time_bar";
        elem_bar_2.className = "black_time_bar";
        if (elem_tim_1.id != "white_timer"){
            elem_tim_2.id = "b";
            elem_tim_1.id = "white_timer";
            elem_tim_2.id = "black_timer";
        }
        else {
            elem_tim_1.id = "b";
            elem_tim_2.id = "white_timer";
            elem_tim_1.id = "black_timer";
        }
        showTime("white");
        showTime("black");
    }
    figure_create();
}

function transformToMap(count) {
    let temp = [];
    for (let [key, value] of Object.entries(list_stroke[count])) {
        temp.push(value);
    }
    return temp;
}

function showFiguresPHP() {
    console.log(map);
}

function getColor(elem){
    if (map[elem] == "0")
        return "";
    else if (map[elem] == map[elem].toLowerCase())
        return "black";
    else if (map[elem] == map[elem].toUpperCase())
        return "white";
}

function getRows(number){
    if (number < 8)
        return 8;
    else if (number < 16)
        return 7;
    else if (number < 24)
        return 6;
    else if (number < 32)
        return 5;
    else if (number < 40)
        return 4;
    else if (number < 48)
        return 3;
    else if (number < 56)
        return 2;
    else
        return 1;

}

function getFreeLines(fromPoly, toPoly, type) {
    if (parseInt(fromPoly) > parseInt(toPoly)) {
        let tmp = fromPoly;
        fromPoly = toPoly;
        toPoly = tmp;
    }
    if (type == 1){
        for (let i = parseInt(fromPoly) + 1; i < parseInt(toPoly); ++i){
            if (getColor(i) != "")
                return false;
        }
        return true;
    }
    else if (type == 2){
        for (let i = parseInt(fromPoly) + 8; i < parseInt(toPoly); i += 8){

            if (getColor(i) != "")
                return false;
        }
        
        return true;
    }
    else if (type == 3){
        for (let i = parseInt(fromPoly) + 7; i < parseInt(toPoly); i += 7){
            if (getColor(i) != "")
                return false;
        }
        return true;
    }
    else if (type == 4){
        for (let i = parseInt(fromPoly) + 9; i < parseInt(toPoly); i += 9){
            if (getColor(i) != "")
                return false;
        }
        return true;
    }
}