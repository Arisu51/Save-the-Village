//entidades
var player;

//posições
var xPlayerPos;

//direções
var dx;
var frames;

//sprites
var spritePlayer;

function inicia() {
    dx = 0;
    xPlayerPos = 0;
    player = document.getElementById('player');
    document.addEventListener('keydown', mover);
    document.addEventListener('keydown', parar);
    game();
}

//movimentação

function control() {
    player.style.left = xPlayerPos + 'px';
}

function mover() {
    tecla = event.keyCode;
    switch (tecla) {
        case 37:
            dx = -1;
            break;
        case 39:
            dx = 1;
            break;
        default:
            break;
    }
    xPlayerPos += dx*3;
}
function parar() {
    tecla = event.keyCode;
    switch (tecla) {
        case 37:
            dx = -1;
            break;
        case 39:
            dx = 1;
            break;
        default:
            break;
    }
    xPlayerPos += dx*3;
}

//atualizador

function game(){
    control();
    frames = requestAnimationFrame(game);
}

window.addEventListener('load', inicia);