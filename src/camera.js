class Camera {
    constructor(ctx, pos, dimensions, scale) {
        this.worldCoords = pos;
        this.canvas = ctx;
        this.width = dimensions[0];
        this.height = dimensions[1];
        this.scale = scale;
        this.gameObjList = [];
    }

    drawObj(gameObj) {
        var xPos = (gameObj.pos.x - gameObj.width/2 - this.worldCoords.x) * this.scale;
        var yPos = (gameObj.pos.y - gameObj.height/2 - this.worldCoords.y) * this.scale;
        
        this.canvas.fillStyle = gameObj.color;
        this.canvas.fillRect(xPos, yPos, gameObj.width*this.scale, gameObj.height*this.scale);
    }

    moveCam(moveVec) {
        this.worldCoords.x += moveVec[0];
        this.worldCoords.y += moveVec[1];
    }

    addToCamera(gameObjList) {
        this.gameObjList = this.gameObjList.concat(gameObjList);
    }

    drawObjs() {
        this.canvas.clearRect(0, 0, this.width, this.height);
        this.gameObjList.forEach(n => this.drawObj(n));
    }
}

export { Camera }