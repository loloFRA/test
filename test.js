/*

	NAME : BALL MOTION [ GAME ]
	DATE : 🔸2️⃣5️⃣🔸0️⃣5️⃣🔶2️⃣0️⃣1️⃣9️⃣🔸
	CODER : LOLO

*/

/*********** CHECK SUPPORT VIBRATION ***********/
let checkVibrate = window.navigator && window.navigator.vibrate;

/*********** CHECK SUPPORT DEVICEMOTION ***********/
if (window.DeviceMotionEvent) {
	alert("Click to start")
}
else{
	alert("This code uses devicemotion, your device does not support it !");
}

/*********** GAME VARIABLES ***********/
var W = 350;	  // canvas width
var H = 350;	  // canvas height
var dx = 0;	   // direction x
var dy = 0;	   // direction y
var alife = true; // stop update()
var map1 =[	   // array coordinates obstacles
	[100,330],
	[100,290],
	[100,250],
	[100,210],
	[100,170],
	[100,130],
	[100,90],
	[100,50],
	[250,20],
	[250,60],
	[250,100],
	[250,140],
	[250,180],
	[250,220],
	[250,260],
	[250,300],
	[60,130],
	[20,20],
	[140,210],
	[210,300],
	[140,50],
	[210,140],
	[330,220],
	[290,140],
	[330,60]
	];

/*********** EVENT DEVICE MOTION ***********/	
function startGame () {
	if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
	DeviceOrientationEvent.requestPermission()
	.then(permissionState => {
		if (permissionState === 'granted') {
			window.addEventListener('devicemotion', (event) => {
				dx = event.accelerationIncludingGravity.x;
				dy = event.accelerationIncludingGravity.y;
			});
		}
	})
	.catch(console.error);
	} 
	else if (typeof DeviceOrientationEvent !== 'undefined'){
	    window.addEventListener('devicemotion', (event) => {
				dx = -event.accelerationIncludingGravity.x;
				dy = -event.accelerationIncludingGravity.y;
			});
	}
}



/*********** INITIALIZATION ***********/
function setup(){
	createCanvas(W, H);
	b = new ball();	
}

/*********** DRAW  ***********/
function draw(){
	background(51);
	b.start(); // draw rect starting point   
	b.show();  // show ball 
	if(alife){
		b.update(); //draw object update
	}
	for(var i=0;i<map1.length;i++){
		if(b.dead(obstacles(map1[i][0],map1[i][1]))){ // draw and check vector (ball,obstacles)
			if (checkVibrate&&alife)navigator.vibrate(100);
			alife=false; // stop update()
			canvas.style.border ="10px solid #E2000D";
			restart.style.display = "block";
			result.style.color = "#E2000D";
			result.innerHTML = "YOU LOSE !";
		}
	}
	if(b.win(finish(340,0))){ // draw and check vector finishing point
	   alife=false;
	   canvas.style.border ="10px solid #018B01";
	   restart.style.display = "block";
	   result.style.color = "#018B01";
	   result.innerHTML = "YOU WIN !";
	}
}

/*********** BALL OBJECT ***********/
function ball(){
	this.x = 20;  // starting point x
	this.y = 330; // starting point y
	this.update = function(){
		this.x += dx; // update dircetion x
		this.y -= dy; // update dircetion y
		this.x = constrain(this.x, 10 , W-10); // constrain ball in canvas width
		this.y = constrain(this.y, 10 , H-10); // constrain ball in canvas height
	}
	this.show = function(){
		fill(255);
		ellipse(this.x, this.y, 20, 20); // draw ball
	}
	this.start = function(){
		fill('#018B01');
		rect(0, 309, 40, 40); // draw rect starting point
		fill('white');
		textSize(12); 
		text("Start", 8,332.5); // draw text in starting point
	}
	this.win = function(pos){
		var dBallFinish = dist(this.x, this.y, pos.x, pos.y+15);
		if(dBallFinish < 10){ // create distance finishing point
			return true;
		}
		else{
			return false;
		}
	}
	this.dead = function(pos){
		var dBallObstacles = dist(this.x, this.y, pos.x, pos.y);
		if(dBallObstacles < 30){// create distance obstacles
			return true;
		}
		else{
			return false;
		}
	}
}

/*********** OBSTACLES OBJECTS ***********/
function obstacles(x,y){
	fill('#E2000D');
	ellipse(x, y, 40, 40); // draw circle obstacle
	return  new p5.Vector(x,y); // return vector obstacle
}

/*********** FINISH OBJECT ***********/
function finish(x,y){
	fill('#018B01');
	rect(x, y, 10, 40); // draw finishing point
	fill('white');
	textSize(18);
	text("Finish", 280,22.5);// draw text finish
	return  new p5.Vector(x,y);// return vector finish
}

/*********** RESET DRAW ***********/
function reset(){
	b = new ball(); 
	alife=true;
	canvas.style.border ="5px solid #4F524F";
	restart.style.display = "none";
}
