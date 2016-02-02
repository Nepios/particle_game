$(document).ready(function(){

var play = true;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var particles = {};
var particleIndex = 0;
var particleNum = 30;
var ballRadius = 3;
var bombRadius = 5;
var bombCount = 0;
var maxRadius = 50;
var score = 0;
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


function Particle(){
	this.x = canvas.width / 2;
	this.y = canvas.height / 2;
	this.vx = Math.random() * 10 - 7;
	this.vy = Math.random() * 10 - 6;
	particleIndex++;
	particles[particleIndex] = this;
	this.id = particleIndex;
	this.life = 0;
	this.maxLife = 800;
	this.color = "rgba(" + parseInt(Math.random()*255, 10) + ', ' + parseInt(Math.random()*255, 10) + ', '+ parseInt(Math.random()*255, 10)+ ', 1)';
}
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
	 if(this.x + this.vx > canvas.width-ballRadius || this.x + this.vx < ballRadius) {
        this.vx = -this.vx;
    	}
    if(this.y + this.vy > canvas.height-ballRadius || this.y + this.vy < ballRadius) {
        this.vy = -this.vy;
    	}
		this.x += this.vx;
    	this.y += this.vy;
    	bomb(coordinates[0],coordinates[1]);
    if ((Math.sqrt(Math.pow((this.x-coordinates[0]), 2) + (Math.pow((this.y-coordinates[1]), 2)))) <= bombRadius) {
    	this.life = 800;
    	score++;
    	$('.score').html('').html('<h4>Score is ' + score + '<h4>');
    }
 	if (bombRadius >= maxRadius){
    	play = false;

    }   


};


function createInterval(){
	play = true;
	for (var i = 0; i < particleNum; i++){
		new Particle();
	};

	animate();
};

function bomb(x,y){
	bombCount++
	if ((bombCount % 200 === 0) && (bombRadius <= maxRadius)){
		bombRadius++;	
	}
	ctx.beginPath();
	ctx.fillStyle = "#00BFFF";
	ctx.arc(coordinates[0], coordinates[1], bombRadius, 0, 2 * Math.PI, true);
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.fillStyle = "#0000FF";
	ctx.arc(coordinates[0], coordinates[1], (bombRadius - 2), 0, 2 * Math.PI, true);
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.arc(coordinates[0], coordinates[1], (bombRadius - 4), 0, 2 * Math.PI, true);
	ctx.fill();
	ctx.closePath();
	return bombRadius;
};


function animate(){
	ctx.fillStyle = 'rgba(0,0,0,0.1)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var i in particles){
		particles[i].draw();
	}
	bomb(coordinates[0],coordinates[1]);
	if (play){
	requestAnimationFrame(animate);
	} else {
		clearCanvas();
	}
};

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

function clearCanvas(){
	ctx.beginPath();
	ctx.fillStyle = 'rgba(0,0,0,1)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

};

canvas.addEventListener("click", function(event){
	coordinates = getPosition(event);
}, false);

$('#start').on('click', createInterval);

$('#reset').on('click', function(){
	play = false;
	bombRadius = 5;
	coordinates = [];
	for (particle in particles){
		delete particles[particle];
	};
	clearCanvas();
	ctx.closePath();
	ctx.beginPath();
});


});

