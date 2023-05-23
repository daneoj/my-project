import * as dobby from './dobby.js';
import * as controls from './controls.js';

var canvas = document.getElementById("canvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");

var dobbz = new dobby.GameObject();
var bobbz = new dobby.GameObject();

var gobbz = new dobby.GameObject();

function update(dt) {
    var vec = controls.getAxes();
    if (!dobbz.willCollide(vec, dt, bobbz.getCorners())) {
        dobbz.update(vec, dt);
    }
    if (bobbz.isInBounds(dobbz.getCorners())) {
        dobbz.color = 'blue';
    } else {
        dobbz.color = 'red';
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    gobbz.draw(ctx);
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

gobbz.pos.x = width/2;
gobbz.pos.y = height/2;
gobbz.size = 0.9 * width;
gobbz.color = 'green';

bobbz.pos.x = width/2;
bobbz.pos.y = height;
bobbz.size = 200;
bobbz.color = 'yellow';
// start loop
window.requestAnimationFrame(loop);