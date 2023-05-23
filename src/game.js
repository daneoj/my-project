import * as dobby from './dobby.js';
import * as controls from './controls.js';

var canvas = document.getElementById("canvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");

var dobbz = new dobby.GameObject();
var bobbz = new dobby.GameObject();

function update(dt) {
    var vec = controls.getAxes();
    dobbz.update(vec, dt);
    if (bobbz.isInBounds(dobbz.getCorners())) {
        dobbz.color = 'blue';
    } else {
        dobbz.color = 'red';
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    bobbz.draw(ctx);
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

bobbz.pos.x = width/4;
bobbz.pos.y = height * 3/4;
bobbz.size = 80;
bobbz.color = 'yellow';
// start loop
window.requestAnimationFrame(loop);