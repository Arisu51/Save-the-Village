//entidades
var player;

//posições
var xPlayerPos;

//direções
var dx;
var frames;

function inicia() {
    dx = 0;
    xPlayerPos = 0;
    player = document.getElementById('player');
    document.addEventListener('keydown', mover);
    document.addEventListener('keydown', parar);
    frames = setInterval(game, 20);
}

function mover() {
    var tecla = event.keyCode;
    if (tecla == 37) {
        dx = -1;
    } else if (tecla == 39) {
        dx = 1;
    }
}
function parar() {
    var tecla = event.keyCode;
    if (tecla == 37) {
        dx = 0;
    } else if (tecla == 39) {
        dx = 0;
    }
}
function game(){
    xPlayerPos += dx*2;
    player.style.left = xPlayerPos + 'px';
}

window.addEventListener('load', inicia);