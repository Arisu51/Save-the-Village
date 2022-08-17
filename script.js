//entidades
var player;
var powerUp = true;

//posições
var xPlayerPos;
var yPlayerPos;

//direções
var dx;
var frames;

//sprites
var spritePlayer;
var jump = false;

var andar = [550, 440, 330, 220, 110];

function inicia() {
    dx = 0;
    xPlayerPos = 0;
    yPlayerPos = andar[0];
    player = document.getElementById('player');
    spritePlayer = document.getElementsByClassName('spritePlayer');
    document.addEventListener('keydown', mover);
    document.addEventListener('keyup', parar);
    game();
}

//movimentação

function control() {
    player.style.left = xPlayerPos + 'px';
    player.style.top = yPlayerPos + 'px';
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
        case 38: //up
            if (powerUp) {
                player.src = 'img/pixil_6.png';
            } else {
                player.src = 'img/pixil_5.png';
            }
            if (!jump && (((player.offsetLeft > 58 && player.offsetLeft < 102)||(player.offsetLeft > 460 && player.offsetLeft < 502))&&(player.offsetTop > 121))) {
                player.classList.add('jump');
	            jump = true;
	            setTimeout(() => {
	                player.classList.remove('jump');
	                jump = false;
                    if (powerUp) {
                        player.src = 'img/pixil_4.png';
                    } else {
                        player.src = 'img/pixil_3.png';
                    }
                    switch (yPlayerPos) {
                        case andar[0]:
                            yPlayerPos = andar[1];
                            break;
                        case andar[1]:
                            yPlayerPos = andar[2];
                            break;
                        case andar[2]:
                            yPlayerPos = andar[3];
                            break;
                        case andar[3]:
                            yPlayerPos = andar[4];
                            break;
                        case andar[4]:
                            yPlayerPos = andar[5];
                            break;
                    
                        default:
                            break;
                    }
	            }, 1000);
            } else if (!jump){
                player.classList.add('hjump');
                jump = true;
                setTimeout(() => {
                    if (powerUp) {
                        player.src = 'img/pixil_4.png';
                    } else {
                        player.src = 'img/pixil_3.png';
                    }
                }, 1000);
                setTimeout(() => {
                    player.classList.remove('hjump');
                    jump = false;
                }, 2000);
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
    if (powerUp && !jump) {
        player.src = 'img/pixil_4.png';
    } else if(!jump){
        player.src = 'img/pixil_3.png';
    }
}

//atualizador

function game(){
    control();
    frames = requestAnimationFrame(game);
}

window.addEventListener('load', inicia);