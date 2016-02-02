$(document).ready(function(){

var play = true;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var particles = {};
var particleIndex = 0;
var particleNum = 30;
var ballRadius = 3;
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
	this.vx = Math.random() * 7 - 5;
	this.vy = Math.random() * 7 - 5;
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
    	bomb(coordinates[0],coordinates[1], "white");
};


function createInterval(){
	play = true;
	for (var i = 0; i < particleNum; i++){
		new Particle();
	};
	animate();
};

function bomb(x,y, color){
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(coordinates[0], coordinates[1], 5, 0, 2 * Math.PI, true);
	ctx.fill();
	ctx.closePath();
};


function animate(){
	ctx.fillStyle = 'rgba(0,0,0,0.1)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var i in particles){
		particles[i].draw();
	}
	bomb(coordinates[0],coordinates[1], "white");
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
	ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
	ctx.fill();
	ctx.closePath();
	return [x, y];

};

function clearCanvas(){
	ctx.beginPath();
	ctx.fillStyle = 'rgba(0,0,0,1)';
	ctx.fillRect(0, 0, 800, 400);

};

canvas.addEventListener("click", function(event){
	coordinates = getPosition(event);
}, false);

$('#start').on('click', createInterval);

$('#reset').on('click', function(){
	play = false;
	coordinates = [];
	for (particle in particles){
		delete particles[particle];
	};
	clearCanvas();
	ctx.closePath();
	ctx.beginPath();
});


});

