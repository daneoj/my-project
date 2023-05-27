class Camera {
    constructor(ctx, pos, dimensions, scale) {
        this.worldCoords = pos;
        this.canvas = ctx;
        this.width = dimensions[0];
        this.height = dimensions[1];
        this.scale = scale; // scale is how many pixels across a game unit is
        this.gameObjList = [];
    }

    drawObj(gameObj) {
        var xPos = (gameObj.pos.x - gameObj.width/2 - this.worldCoords.x) * this.scale + this.width/2;
        var yPos = (gameObj.pos.y - gameObj.height/2 - this.worldCoords.y) * this.scale + this.height/2;
        
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

    setScale(newScale) {
        this.scale = newScale;
    }
}

export { Camera }