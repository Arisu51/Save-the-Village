//entidades
var player = document.getElementById('player');

//posições
var xPlayerPos;

//direções
var dx;

function playerControl(){
    xPlayerPos += dx*5;
    player.style.left = xPlayerPos + 'px';

}

function mover (){
    tecla = event.keycode;
    if (tecla==39) {
		dx = 1
	}else if (tecla==37) {
		dx = -1;
	}
}

function game (){
    playerControl();
    frames = requestAnimationFrame(game);
}

game();

document.addEventListener('keydown', mover);
//document.addEventListener('keyup', parar);