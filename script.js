//entidades
var player;
var enemy;
var powerUp = true;

//tamanhos
var gameSizeL;

//posições
var xPlayerPos;
var yPlayerPos;

//direções
var dx, de;
var frames;
var r;
var side;

//sprites
var jump = false;
var fall = false;

var andar = [550, 440, 330, 220, 110];

function inicia() {
    dx = 0;
    xPlayerPos = 0;
    yPlayerPos = andar[0];
    player = document.getElementById('player');
    enemy = document.getElementsByClassName('frame');
    gameSizeL = document.getElementById('game').offsetLeft;
    document.addEventListener('keydown', mover);
    document.addEventListener('keyup', parar);
    game();
}

//movimentação

function control() {
    player.style.left = xPlayerPos + 'px';
    player.style.top = yPlayerPos + 'px';
}

function enemyControl() {
    if (enemy.offsetLeft > gameSizeL+300) {
        console.log('esquerda');
    }
}

function hJump() { //pulo alto
    player.classList.add('jump');
    jump = true;
    fall = true
    if (powerUp && jump) {
        player.src = 'img/pixil_6.png';
    } else {
        player.src = 'img/pixil_5.png';
    }
    setTimeout(() => {
        player.classList.remove('jump');
        jump = false;
        fall = false;
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
        }
    }, 1000);
}

function lJump() { //pulo baixo
    player.classList.add('hjump');
    jump = true;
    fall = true;
    if (powerUp && jump) {
        player.src = 'img/pixil_6.png';
    } else {
        player.src = 'img/pixil_5.png';
    }
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
        fall = false;
    }, 2000);
}
function down() {
    player.classList.add('fall');
    fall = true;
    jump = true;
    setTimeout(() => {
        player.classList.remove('fall');
        fall = false;
        jump = false;
        switch (yPlayerPos) {
            case andar[1]:
                yPlayerPos = andar[0];
                break;
            case andar[2]:
                yPlayerPos = andar[1];
                break;
            case andar[3]:
                yPlayerPos = andar[2];
                break;
            case andar[4]:
                yPlayerPos = andar[3];
                break;
            case andar[5]:
                yPlayerPos = andar[4];
                break;
        }
    }, 800);
}

function shot(x, y) { //poder
    var t = document.createElement('div');
    var att1 = document.createAttribute('class');
    var att2 = document.createAttribute('style');
    att1.value = 'shot';
    att2.value = 'top:'+y+'px;left:'+x+'px;';
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.getElementById('container').appendChild(t);
}

function mover() {
    tecla = event.keyCode;
    switch (tecla) {
        case 32: //space
            if (powerUp && !jump) {
                shot(xPlayerPos+16+2.5, yPlayerPos+29);
            }
            break;
        case 37: //left
            if (powerUp) {
                player.src = 'img/pixil_2.png';
                dx = -2;
                xPlayerPos += dx*5;
            } else {
                player.src = 'img/pixil_1.png';
                dx = -1;
                xPlayerPos += dx*5;
            }
            r = -1;
            break;
        case 39: //right
            if (powerUp) {
                player.src = 'img/pixil_8.png';
                dx = 2;
                xPlayerPos += dx*5;
            } else {
                player.src = 'img/pixil_7.png';
                dx = 1;
                xPlayerPos += dx*5;
            }
            r = 1;
            break;
        case 40: //down
        if (!fall && (((player.offsetLeft > 58 && player.offsetLeft < 102)||(player.offsetLeft > 460 && player.offsetLeft < 502))&&(player.offsetTop < 510))) {
                down();
            }
            break;
        case 38: //up
            if (!jump && (((player.offsetLeft > 58 && player.offsetLeft < 102)||(player.offsetLeft > 460 && player.offsetLeft < 502))&&(player.offsetTop > 121))) {
                hJump();
            } else if (!jump){
                lJump();
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
            if (powerUp) {
                player.src = 'img/pixil_4.png';
            } else {
                player.src = 'img/pixil_3.png';
            }
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
    enemyControl();
    frames = requestAnimationFrame(game);
}

window.addEventListener('load', inicia);