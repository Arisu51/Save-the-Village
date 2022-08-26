//entidades
var player;
var powerUp = true;
var jogo = null;
var powerUp;

//UI
var gameUI;
var menuUI;

//posições
var xPlayerPos;
var yPlayerPos;

//direções
var dx, de;
var frames;
var r;
var dl = [];

//sprites
var jump = false;
var fall = false;

var andar = [550, 440, 330, 220, 110];

function play(){
    menuUI.style.display = "none";
    gameUI.style.display = "block";
    dx = 0;
    xPlayerPos = 0;
    yPlayerPos = andar[0];
    document.addEventListener('keydown', mover);
    document.addEventListener('keyup', parar);
    jogo = true;
    power();
    game();
}

function start() {
    player = document.getElementById('player');
    gameUI = document.getElementById('container');
    menuUI = document.getElementById('menu');
}

//movimentação

function control() {
    player.style.left = xPlayerPos + 'px';
    player.style.top = yPlayerPos + 'px';
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
        /*for (let i = 0; i < 4; i++) {
            if (yPlayerPos == andar[i]) {
                yPlayerPos = andar[i+1];
            }
        }*/
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
        for (let i = 1; i < andar.length; i++) {
            if (yPlayerPos == andar[i]) {
                yPlayerPos = andar[i-1];
            }
        }
    }, 800);
}

function shot(x, y) { //poder
    let t = document.createElement('div');
    let att1 = document.createAttribute('class');
    let att2 = document.createAttribute('style');
    att1.value = 'shot';
    att2.value = 'top:'+y+'px;left:'+x+'px;';
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    gameUI.appendChild(t);
}

function shotControl() {
    let shots = document.getElementsByClassName('shot');
    let tam = shots.length;
    for(let i=0; i<tam; i++) {
        if(shots[i]) {
            var pl = shots[i].offsetLeft;
            pl += dl[i];
            shots[i].style.left = pl + 'px';
            if(pl > 600 || pl < 0) {
                shots[i].remove();
                dl.splice(i, 1);
            }
        }
    }
}

function power() {
    let melon = false;
    if(jogo) {
        setInterval(() => {
            if (!melon) {
                let t = document.createElement('div');
                let att1 = document.createAttribute('id');
                let att2 = document.createAttribute('style');
                att1.value = 'melons';
                att2.value = 'top:'+(andar[Math.floor(Math.random()*andar.length)]+70)+'px;left:'+(Math.floor(Math.random()*560)+20)+'px;';
                t.setAttributeNode(att1);
                t.setAttributeNode(att2);
                gameUI.insertBefore(t, gameUI.children[0]);
                melon = true;
            }
        }, (Math.random()*3001)+1000);
    }
}

function mover() {
    tecla = event.keyCode;
    switch (tecla) {
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
            r = false;
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
            r = true;
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
            break;
        case 32:
            if (powerUp && !jump) {
                shot(xPlayerPos+16+2.5, yPlayerPos+29);
            }
            if(r && !jump) {
                dl.push(5);
            }else if (!jump){
                dl.push(-5);
            }
            break;
        default:
            break;
    }
}

//atualizador

function game(){
    control();
    shotControl();
    frames = requestAnimationFrame(game);
}

window.addEventListener('load', start);