import * as dobby from './dobby.js';
import * as controls from './controls.js';

var canvas = document.getElementById("canvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");

function update(dt) {
    var vec = controls.getAxes();
    dobby.updateDobby(vec, dt);
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    dobby.drawDobby(ctx);
}

function loop(time) {
    var dt = time - lastTime;
    update(dt);
    draw();
    
    lastTime = time;
    window.requestAnimationFrame(loop);
}

// initialize
var lastTime = 0;

dobby.state.x = width/2;
dobby.state.y = height/2;
// start loop
window.requestAnimationFrame(loop);