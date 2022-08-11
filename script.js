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

function jump() {

}

function mover() {
    tecla = event.keyCode;
    switch (tecla) {
        case 37:
            if (powerUp) {
                player.src = 'img/pixil_2.png';
                dx = -2;
                xPlayerPos += dx*5;
            } else {
                player.src = 'img/pixil_1.png';
                dx = -1;
                xPlayerPos += dx*5;
            }
            break;
        case 39:
            if (powerUp) {
                player.src = 'img/pixil_8.png';
                dx = 2;
                xPlayerPos += dx*5;
            } else {
                player.src = 'img/pixil_7.png';
                dx = 1;
                xPlayerPos += dx*5;
            }
            break;
        case 40:
            break;
        case 38:
            if (powerUp) {
                player.src = 'img/pixil_6.png';
            } else {
                player.src = 'img/pixil_5.png';
                player.classList.add('jump');
            }
            break;
        default:
            break;
    }
}
function parar() {
    tecla = event.keyCode;
    switch (tecla) {
        case 37:
            dx = 0;
            xPlayerPos += dx*5;
            break;
        case 39:
            dx = 0;
            xPlayerPos += dx*5;
            break;
        default:
            break;
    }
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