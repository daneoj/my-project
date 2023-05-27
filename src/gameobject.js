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

    updatePos(vec) {
        this.pos.x += vec[0];
        this.pos.y += vec[1];
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


class PhysicsObject extends GameObject {
    constructor() {
        super();
        this.spd = 0;
    }

    getMovementVec(vec, dt) {
        return vec.map(e => e * dt * this.spd);
    }

    willCollide(vec, corners) {
        return this.isInBounds(corners, vec);
    }

    getAllowedMovement(vec, corners) {
        var minX = corners[0][0];
        var maxX = corners[3][0];
        var minY = corners[0][1];
        var maxY = corners[3][1];

        if (vec[0] > 0) {
            var xMov = minX - (this.pos.x + this.width/2);
            if (xMov >= 0 && xMov < vec[0]) {
                vec[0] = xMov;
            } 
        }
        else if (vec[0] < 0) {
            var xMov = maxX - (this.pos.x - this.width/2);
            if (xMov <= 0 && xMov > vec[0]) {
                vec[0] = xMov;
            } 
        }
        if (vec[1] > 0) {
            var yMov = minY - (this.pos.y + this.height/2);
            if (yMov >= 0 && yMov < vec[1]) {
                vec[1] = yMov;
            } 
        }
        else if (vec[1] < 0) {
            var yMov = maxY - (this.pos.y - this.height/2);
            if (yMov <= 0 && yMov > vec[1]) {
                vec[1] = yMov;
            }
        }
        return vec;
    }

    // **********
    // JSON Parse
    // **********

    parsePhysicsObject(data) {
        // default values if null (not in json)
        this.pos = {x: data.x ?? 0, y: data.y ?? 0};
        this.width = data.width ?? 10;
        this.height = data.height ?? 10;
        this.spd = data.spd ?? 0;
        this.color = data.color ?? 'white';
    }
}

export { GameObject, PhysicsObject };