class GameObject {
    constructor() {
        this.pos = {x: 0, y: 0};
        this.width = 0;
        this.height = 0;
        this.color = 'white';
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x - this.width/2, this.pos.y - this.height/2, this.width, this.height);
    }

    getCorners() {
        return [
            [this.pos.x - this.width/2, this.pos.y - this.height/2],
            [this.pos.x - this.width/2, this.pos.y + this.height/2],
            [this.pos.x + this.width/2, this.pos.y - this.height/2],
            [this.pos.x + this.width/2, this.pos.y + this.height/2]
        ];
    }

    isInBounds(corners, vec = [0, 0]) {
        var selfcorners = this.getCorners();
        var collided = false;
        corners.forEach(element => {
            if (element[0] > (selfcorners[0][0] + vec[0]) &&
                element[0] < (selfcorners[3][0] + vec[0]) &&
                element[1] > (selfcorners[0][1] + vec[1]) &&
                element[1] < (selfcorners[3][1] + vec[1])) { 
                collided = true;
            }
        });
        if (collided) {
            return true;
        }
        selfcorners.forEach(element => {
            if ((element[0]+ vec[0]) > corners[0][0] &&
                (element[0]+ vec[0]) < corners[3][0] &&
                (element[1]+ vec[1]) > corners[0][1] &&
                (element[1]+ vec[1]) < corners[3][1]) {
                collided = true;
            }
        });
        return collided;
    }

    // **********
    // JSON Parse
    // **********

    parseGameObject(data) {
        // default values if null (not in json)
        this.pos = {x: data.x ?? 0, y: data.y ?? 0};
        this.width = data.width ?? 10;
        this.height = data.height ?? 10;
        this.color = data.color ?? 'white';
    }
}


class PlayerObject extends GameObject {
    constructor() {
        super();
        this.spd = 0;
    }
    
    update(vec, dt) {
        this.pos.x += vec[0] * dt * this.spd;
        this.pos.y += vec[1] * dt * this.spd;
    }

    willCollide(vec, dt, corners) {
        var movement = this.spd * dt;
        var tempVec = vec.map(el => el * movement);
        return this.isInBounds(corners, tempVec);
    }

    // **********
    // JSON Parse
    // **********

    parsePlayerObject(data) {
        // default values if null (not in json)
        this.pos = {x: data.x ?? 0, y: data.y ?? 0};
        this.width = data.width ?? 10;
        this.height = data.height ?? 10;
        this.spd = data.spd ?? 0;
        this.color = data.color ?? 'white';
    }
}

export { GameObject, PlayerObject };