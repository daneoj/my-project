import { PhysicsObject, GameObject } from './gameobject.js';
import { PlayerObject } from './playerobject.js';
import * as controls from './controls.js';
import { Camera } from './camera.js';

class Logic {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.dobbz = new PlayerObject();
        this.walls = [];
    }

   init(levelInfo) { 
        var ctx = canvas.getContext("2d");
        this.dobbz.parse(levelInfo.user);
        levelInfo.walls.forEach(element => {
            var wall = new GameObject();
            wall.parse(element);
            this.walls.push(wall);
        });
        this.camera = new Camera(ctx, {x: 0, y: 0}, [canvas.width, canvas.height], 30);
        var gameObjList = this.walls.map(n => n);
        gameObjList.push(this.dobbz);
        this.camera.addToCamera(gameObjList);
    }

    tick(dt) {
        this.update(dt);
        this.draw();
    }

    update(dt) {
        var vec = controls.getAxes();
        var willCollide = [];
        var moveVec = this.dobbz.update(vec, dt);
        this.walls.forEach((e, idx, arr) => {
            if (this.dobbz.willCollide(moveVec, e.getCorners())) {
                willCollide.push(idx);
            }
        });
        if (willCollide.length == 0) {
            this.dobbz.updatePos(moveVec);
            this.camera.moveCam(moveVec);
        } else {
            willCollide.forEach(e => { moveVec = this.dobbz.getAllowedMovement(moveVec, this.walls[e].getCorners()) });
            
            this.dobbz.updatePos(moveVec);
            this.camera.moveCam(moveVec);
        }
    }

    draw() {
        this.camera.drawObjs();
    }

}

export { Logic }