function main_menu_show(){
    elem = document.getElementsByClassName("dropdown-content")[0];
    elem.style = "display: none";
    elem.innerHTML = "";
    let one = document.createElement('a');
    one.classList = "fon";
    one.innerHTML = "Фон";

    let two = document.createElement('a');
    two.classList = "style-figures";
    two.innerHTML = "Оформление фигур";

    let three = document.createElement('a');
    three.classList = "style-board";
    three.innerHTML = "Оформление доски";

    elem.appendChild(one);
    elem.appendChild(two);
    elem.appendChild(three);
}

button = document.getElementsByClassName("settings")[0];
if (button != undefined) {
    button.onclick = function(event) {
        elem = document.getElementsByClassName("dropdown-content")[0];
        if (elem.style.display != "block")
            elem.style = "display: block";
        else {
            main_menu_show();
        }
    };  
}

$('body').click(function (event) {
    button = document.getElementsByClassName("settings")[0];
    if (button != undefined) {
        button.onclick = function(event) {
            elem = document.getElementsByClassName("dropdown-content")[0];
            if (elem.style.display != "block")
                elem.style = "display: block";
            else {
                main_menu_show();
            }
        };  
    }
});