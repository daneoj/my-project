import { PlayerObject, GameObject } from './dobby.js';
import * as controls from './controls.js';
import { Camera } from './camera.js';

class Logic {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.dobbz = PlayerObject;
        this.walls = [];
    }

   init(levelInfo) { 
        var width = canvas.width;
        var height = canvas.height;
        var ctx = canvas.getContext("2d");

        var level = levelInfo.levels[0];
        
        this.dobbz = new PlayerObject();
        this.dobbz.parsePlayerObject(level.user);
        
        this.walls = [];
        level.walls.forEach(element => {
            var wall = new GameObject();
            wall.parseGameObject(element);
            this.walls.push(wall);
        });
        
        // start loop
        this.camera = new Camera(ctx, {x: 0, y: 0}, [width, height], 50);
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
        var willCollide = false;
        var moveVec = this.dobbz.getMovementVec(vec, dt);
        this.walls.forEach(el => {
            if (!willCollide) {
                willCollide = this.dobbz.willCollide(moveVec, el.getCorners());
            }
        });
        if (!willCollide) {
            this.dobbz.updatePos(moveVec);
            this.camera.moveCam(moveVec);
        } else {
            this.walls.forEach(w => {
                moveVec = this.dobbz.getAllowedMovement(moveVec, w.getCorners());
            });
            this.dobbz.updatePos(moveVec);
            this.camera.moveCam(moveVec);
        }
    }

    draw() {
        this.camera.drawObjs();
    }

}

export { Logic }