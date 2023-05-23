import * as dobby from './dobby.js';
import * as controls from './controls.js';

var canvas = document.getElementById("canvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");

var dobbz = new dobby.GameObject();

function update(dt) {
    var vec = controls.getAxes();
    dobbz.update(vec, dt);
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    dobbz.draw(ctx);
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

dobbz.pos.x = width/2;
dobbz.pos.y = height/2;
// start loop
window.requestAnimationFrame(loop);