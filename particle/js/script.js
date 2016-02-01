// context.fillRect(0, 0, canvas.width, canvas.height);
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var particles = {};
var particleIndex = 0;
var particleNum = 30;
var interval;
var ballRadius = 3;
canvas.width = 800;
canvas.height= 400;
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.save();

function Particle(){
	this.x = canvas.width / 2;
	this.y = canvas.height / 2;
	this.vx = Math.random() * 10 - 5;
	this.vy = Math.random() * 10 - 5;
	// this.vx = 8;
	// this.vy = 5;
	particleIndex++;
	particles[particleIndex] = this;
	this.id = particleIndex;
	this.life = 0;
	this.maxLife = 800;
}
Particle.prototype.draw = function(){
	this.x += this.vx;
	this.y += this.vy;
	this.life++;
	if (this.life >= this.maxLife){
		delete particles[this.id];
	}
	ctx.beginPath();
	ctx.fillStyle = "white";
	// ctx.fillRect(this.x,this.y, 10,10);
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


};

for (var i = 0; i < particleNum; i++){
	new Particle();
};

interval = setInterval(function(){
	ctx.fillStyle = 'rgba(0,0,0,0.1)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var i in particles){
		particles[i].draw();
	}
}, 20);
