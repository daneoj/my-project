import * as dobby from './dobby.js';
import * as controls from './controls.js';
import levelData from './levels.js';
import { Camera } from './camera.js';

var canvas = document.getElementById("canvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");

function update(dt) {
    var vec = controls.getAxes();
    var willCollide = false;
    var moveVec = dobbz.getMovementVec(vec, dt);
    walls.forEach(el => {
        if (!willCollide) {
            willCollide = dobbz.willCollide(moveVec, el.getCorners());
        }
    });
    if (!willCollide) {
        dobbz.updatePos(moveVec);
    } else {
        walls.forEach(w => {
            moveVec = dobbz.getAllowedMovement(moveVec, w.getCorners());
        });
        dobbz.updatePos(moveVec);
    }
}

function draw() {
    camera.drawObjs();
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

var level = levelData.levels[0];
var dobbz = new dobby.PlayerObject();
dobbz.parsePlayerObject(level.user);

var walls = [];
level.walls.forEach(element => {
    var wall = new dobby.GameObject();
    wall.parseGameObject(element);
    walls.push(wall);
});

// start loop
var camera = new Camera(ctx, {x: -100, y:-150}, [width, height], 0.5);
var gameObjList = walls.map(n => n);
gameObjList.push(dobbz);
camera.addToCamera(gameObjList);

window.requestAnimationFrame(loop);