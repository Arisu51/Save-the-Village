//entidades
var player;
var powerUp = false;
var jogo = null;
var powerUp;
var divMelon;
var melon;

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
    frame();
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
        for (let i = 4; i > -1; i--) {
            if (yPlayerPos == andar[i]) {
                yPlayerPos = andar[i+1];
            }
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

function frame() {
    setInterval(() => {
	    let t = document.createElement('img');
	    let att1 = document.createAttribute('class');
	    let att2 = document.createAttribute('style');
	    att1.value = 'frame';
        let left = lado();
        
        function lado () {
	        let test = Math.floor(Math.random()*2);
	        if (test>0) {
	            return -32;
	        } else {
	            return 600;
	        }
	    }
	    att2.value = 'top:'+(andar[Math.floor(Math.random()*andar.length)])+'px;left:'+left+'px;content:url("img/frame_1.png");';
	    t.setAttributeNode(att1);
	    t.setAttributeNode(att2);
	    gameUI.appendChild(t);
    }, (Math.random()*3001)+1000);
}

function frameControl(){
    let enemies = document.getElementsByClassName('frame');
    let tam = enemies.length;
    for(let i=0; i<tam; i++) {
        var pl;
        if(enemies[i]) {
            if(pl<300){
                pl += 1;
            } else{
                pl -= 1;
                enemies[i].style.transform = 'scaleX(-1)';
            }
            enemies[i].style.left = pl + 'px';
        }
    }
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
    melon = false;
    if(jogo) {
        setTimeout(() => {
            if (!melon && !powerUp) {
                let t = document.createElement('div');
                let att1 = document.createAttribute('id');
                let att2 = document.createAttribute('style');
                att1.value = 'melons';
                att2.value = 'top:'+(andar[Math.floor(Math.random()*andar.length)])+'px;left:'+(Math.floor(Math.random()*300)+140)+'px;';
                t.setAttributeNode(att1);
                t.setAttributeNode(att2);
                gameUI.insertBefore(t, gameUI.children[0]);
                melon = true;
                divMelon = document.getElementById('melons');
            }
        }, (Math.random()*20001)+10000);
    }
}

function colisions(){
    if (jump && (melon && (player.offsetTop == divMelon.offsetTop && (divMelon.offsetLeft+20 > player.offsetLeft && (divMelon.offsetLeft < player.offsetLeft+40 && player))))){
        setTimeout(() => {
	        divMelon.remove();
	        melon = false;
	        powerUp = true;
	        setTimeout(() => {
	            powerUp = false;
                power();
	        }, 20000);
        }, 1000);
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
            if (!powerUp) {
                player.src = 'img/pixil_3.png';
            } else {
                player.src = 'img/pixil_4.png'
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
            if (powerUp) {
	            if (!jump) {
	                shot(xPlayerPos+16+2.5, yPlayerPos+29);
	            }
	            if(r && !jump) {
	                dl.push(5);
	            }else if (!jump){
	                dl.push(-5);
	            }
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
    colisions();
    frameControl();
    frames = requestAnimationFrame(game);
}

window.addEventListener('load', start);