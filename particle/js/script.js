$(document).ready(function(){
//initialize variables and canvas parameters
var play = true;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var particles = {};
var particleIndex = 0;
var particleNum = 40;
var ballRadius = 3;
var bombRadius = 5;
var bombCount = 0;
var maxRadius = 75;
var score = 0;
var score2 = 0;
var extraballs = false;
var player = 0;
var highScore = localStorage.highScore;
var coordinates = [];
var requestAnimationFrame =  
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
          return setTimeout(callback, 1);
        };
canvas.width = 800;
canvas.height= 400;

// use constructor to create object made up of particles
function Particle() {
	this.x = canvas.width / 2;
	this.y = canvas.height / 2;
	this.vx = Math.random() * 10 - 7;
	this.vy = Math.random() * 10 - 6;
	particleIndex++;
	particles[particleIndex] = this;
	this.id = particleIndex;
	this.life = 0;
	this.maxLife = 1000;
	this.color = "rgba(" + parseInt(Math.random()*255, 10) + ', ' + parseInt(Math.random()*255, 10) + ', '+ parseInt(Math.random()*255, 10)+ ', 1)';
}

// add the draw function to Particle prototype which will be used for animation of the particles
Particle.prototype.draw = function(){
	this.x += this.vx;
	this.y += this.vy;
	this.life++;
	if (this.life >= this.maxLife){
		delete particles[this.id];
	}
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, ballRadius, 0, 2 * Math.PI, true);
	ctx.fill();
	ctx.closePath();

	// make the particles bounce off the edges of the canvas
	if(this.x + this.vx > canvas.width-ballRadius || this.x + this.vx < ballRadius) {
        this.vx = -this.vx;
    	}
    if(this.y + this.vy > canvas.height-ballRadius || this.y + this.vy < ballRadius) {
        this.vy = -this.vy;
    	}
	this.x += this.vx;
    this.y += this.vy;
    bomb(coordinates[0],coordinates[1], "#00BFFF");

    // test for collisions between the bomb and the particles
    if ((Math.sqrt(Math.pow((this.x-coordinates[0]), 2) + (Math.pow((this.y-coordinates[1]), 2)))) <= bombRadius) {
    	this.life = 1000;
    	bomb(this.x, this.y, this.color);
     	if (player % 2 === 0){
    		score2++;
    		alert("player 2");
    	$('.score-2').html('').html('<h4>Player 2: ' + score2+ '<h4>');	
    	}else {
    		score++;
    	$('.score-1').html('').html('<h4>Player 1: ' + score + '<h4>');
    	}	
    }

    // stop animation once the bomb reaches maxRadius
 	if (bombRadius >= maxRadius){
 		getWinner();
    	play = false;
       }
};

// determine the winner
function getWinner(){
    if ((player % 2 == 0) && (score > score2)){
    	sweetAlert("Player 1 is the winner!");
    } else if ((player % 2 == 0) && (score < score2)){
    	sweetAlert("Player 2 is the winner!");
    }

};
// create the initial particles
function createParticle(){
	play = true;
	for (var i = 0; i < particleNum; i++){
		new Particle();
	};
	animate();
};

// draw the bomb on the screen and increase radius over time
function bomb(x, y, color){
	bombCount++
		if ((bombCount % 200 === 0) && (bombRadius <= maxRadius)){
		bombRadius++;	
	}
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x, y, bombRadius, 0, 2 * Math.PI, true);
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.arc(x, y, (bombRadius - 2), 0, 2 * Math.PI, true);
	ctx.fill();
	ctx.closePath();
	return bombRadius;
};

// animate the particles and the bomb
function animate(){
	ctx.fillStyle = 'rgba(0,0,0,0.1)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var i in particles){
		particles[i].draw();
	}
	bomb(coordinates[0],coordinates[1], "#00BFFF");
	if (play){
	requestAnimationFrame(animate);
	} else {
		clearCanvas();
	}
};
// get the position of the mouse to place the bomb on the canvas
function getPosition(event){
	x = event.x;
	y = event.y;
	var rect = canvas.getBoundingClientRect();
    x = event.x- rect.left;
    y = event.y - rect.top;
	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.arc(x, y, 6, 0, 2 * Math.PI, true);
	ctx.fill();
	ctx.closePath();
	return [x, y];

};

// clear the canvas of all particles and bomb
function clearCanvas(){
	ctx.beginPath();
	ctx.fillStyle = 'rgba(0,0,0,1)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

};

// add event listener to the canvas for bomb placement
canvas.addEventListener("click", function(event){
	coordinates = getPosition(event);
}, false);

// add event listener for click of the start button
$('#start').on('click', function(){
	if (play == false){
		sweetAlert("Please press reset and then play to start a new game.");
	} else{

		// change highScore on page
		if (highScore === undefined){	
			$('.highscore').html('').html('<h4>High Score is 0<h4>');
		} else {
			$('.highscore').html('').html('<h4>High Score is ' + highScore +'<h4>');
		}
	}	
	
	// eliminate ability to add more particles by clicking start again
	if (extraballs === false){
		extraballs = true;
		player++;
		
		// indicate the player's turn by turning background div red
		if (player % 2 === 0){
			$('.score-2').css('background-color', 'red');
	     	$('.score-1').css('background-color', 'black');
		} else {
			$('.score-1').css('background-color', 'red');
	     	$('.score-2').css('background-color', 'black');
		}
		// create particles
		createParticle();
	}

});

// add eventlistener for click of reset button and clear the canvas
$('#reset').on('click', function(){
	
	// add new highScore to localstorage
	if ((score > highScore) || (highScore === undefined)){
		localStorage.highScore = score;
		highScore = localStorage.highScore;
		$('.highscore').html('').html('<h4>High Score is ' + highScore +'<h4>');
	} else if ((score2 > highScore) || (highScore === undefined)){
		localStorage.highScore = score2;
		highScore = localStorage.highScore;
		$('.highscore').html('').html('<h4>High Score is ' + highScore +'<h4>');
	}

	// clear the players' scores from the divs
	if (player % 2 === 0){
		$('.score-1').html('').html('<h4>Player 1: 0<h4>');
		$('.score-2').html('').html('<h4>Player 2: 0<h4>');
		score = 0;
		score2 = 0;
	}
	// reset variables so game play will start again
	play = true;
	extraballs = false;
	bombRadius = 5;
	coordinates = [];
	// delete any remaining particles from the canvase
	for (particle in particles){
		delete particles[particle];
	};
	// clear the bomb from the screen
	clearCanvas();
});

// add eventlistener for click on the info button
$('#info').on('click', function(){
	sweetAlert("How to Play", "Click on start to initiate the particles, then click anywhere in the box to deploy a bomb and try to take out as many particles as possible.");
});

});

