
$(function () {
    setDraggable();
    setDroppable();

});

function setDraggable() {
    $('.figure-white').draggable();
    $('.figure-black').draggable();
    console.log('dragg');
}

function setDroppable() {
    $('.square').droppable({
        drop: function (event, ui) {
            let fromPoly = ui.draggable.attr('name');
            let toPoly = this.id;
            moveFigure(fromPoly, toPoly);
        }
    })
    console.log('dropp');
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
    console.log('mov');
    setDraggable();
}

const settings1 = document.getElementById("1");
settings1.onclick = function(event) {
    let response = fetch('/chess/');
    if (response.ok) { 
        let json = response.json();
        alert(response.status);
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
};
