//entidades
var player;
var powerUp = false;

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
    spritePlayer = document.getElementsByClassName('spritePlayer');
    document.addEventListener('keydown', mover);
    document.addEventListener('keyup', parar);
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
            if (powerUp) {
                player.src = 'img/pixil_2.png';
            } else {
                player.src = 'img/pixil_1.png';
            }
            break;
        case 39:
            dx = 1;
            if (powerUp) {
                player.src = 'img/pixil_8.png';
            } else {
                player.src = 'img/pixil_7.png';
            }
            break;
        default:
            break;
    }
    xPlayerPos += dx*5;
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
    xPlayerPos += dx*5;
    if (powerUp) {
        player.src = 'img/pixil_4.png';
    } else {
        player.src = 'img/pixil_3.png';
    }
}

//atualizador

function game(){
    control();
    frames = requestAnimationFrame(game);
}

window.addEventListener('load', inicia);