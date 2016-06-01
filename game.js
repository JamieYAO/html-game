var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);


//bg
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";


// hero
var hero = {
	speed: 256,
	x: 0,
	y: 0
};

var monster = {}
var monstersCaught = 0;

//handle key
var keysDown = {};

addEventListener('keydown', function(e) {
	keysDown[e.keyCode] = true;
}, false)

addEventListener('keyup', function(e){
	delete keysDown[e.keyCode];
}, false);

var monsterNo = Math.random() * 10;
// init game hero and monster
var reset = function() {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;


	for (var k=0; k < monsterNo; k ++) {
		monster[k] = {};	
		monster[k].x = 32 + (Math.random() * (canvas.width - 64));
		monster[k].y = 32 + (Math.random() * (canvas.height - 64));
	}
}

// refresh hero and monster and checkout two
var update = function (modifier) {
	var heroOldy = hero.y, heroOldx = hero.x;
    if (38 in keysDown) { // keyboard ↑
    	heroOldy = hero.y;
        hero.y -= hero.speed * modifier;
        if (hero.y < 32) {
        	hero.y = 32;
        }
        collisionDetecionXY(heroOldx, heroOldy)
    }
    if (40 in keysDown) { // keyboard ↓
    	heroOldy = hero.y;
        hero.y += hero.speed * modifier;
        if (hero.y > canvas.height - 64) {
        	hero.y = canvas.height - 64;
        }
        collisionDetecionXY(heroOldx, heroOldy)
    }
    if (37 in keysDown) { // keyboard ←
    	heroOldx = hero.x;
        hero.x -= hero.speed * modifier;
		if (hero.x < 32) {
        	hero.x = 32;
        }
        collisionDetecionXY(heroOldx, heroOldy)        
    }
    if (39 in keysDown) { // keyboard →
    	heroOldx = hero.x;
        hero.x += hero.speed * modifier;
        if (hero.x > canvas.width - 64) {
        	hero.x = canvas.width - 64;
        }
        collisionDetecionXY(heroOldx, heroOldy)
    }

    // 英雄与怪物碰到了么？
    //collisionDetecion();
};

function collisionDetecion(herox, heroy) {
	if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        ++monstersCaught;
        reset();
    }
}

function collisionDetecionXY(heroOldx, heroOldy) {
	for (var k = 0; k < monsterNo; k++) {
		if (hero.x <= (monster[k].x + 32) 
			&& monster[k].x <= (hero.x + 32) 
			&& hero.y <= (monster[k].y + 32) 
			&& monster[k].y <= (hero.y + 32)) {
				hero.x = heroOldx;
				hero.y = heroOldy;
		}
	}
}

// render all
var render = function() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		for (var k = 0; k < monsterNo; k++) {
			ctx.drawImage(monsterImage, monster[k].x, monster[k].y);
		}
	}

	// 计分
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
}

// main function
var main = function() {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
}

var then = Date.now();
reset();
main();






















