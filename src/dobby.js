class GameObject {
    constructor() {
        this.pos = {x: 0, y: 0};
        this.width = 0;
        this.height = 0;
        this.spd = 0;
        this.color = 'white';
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x - this.width/2, this.pos.y - this.height/2, this.width, this.height);
    }

    update(vec, dt) {
        this.pos.x += vec[0] * dt * this.spd;
        this.pos.y += vec[1] * dt * this.spd;
    }

    getCorners() {
        return [
            [this.pos.x - this.width/2, this.pos.y - this.height/2],
            [this.pos.x - this.width/2, this.pos.y + this.height/2],
            [this.pos.x + this.width/2, this.pos.y - this.height/2],
            [this.pos.x + this.width/2, this.pos.y + this.height/2]
        ];
    }

    isInBounds(corners) {
        var selfcorners = this.getCorners();
        var collided = false;
        corners.forEach(element => {
            if (element[0] > selfcorners[0][0] &&
                element[0] < selfcorners[3][0] &&
                element[1] > selfcorners[0][1] &&
                element[1] < selfcorners[3][1]) {
                collided = true;
            }
        });
        if (collided) {
            return true;
        }
        selfcorners.forEach(element => {
            if (element[0] > corners[0][0] &&
                element[0] < corners[3][0] &&
                element[1] > corners[0][1] &&
                element[1] < corners[3][1]) {
                collided = true;
            }
        });
        return collided;
    }

    willCollide(vec, dt, corners) {
        var temp = new GameObject();
        temp.pos = { x: this.pos.x, y: this.pos.y };
        temp.width = this.width;
        temp.height = this.height;
        temp.spd = this.spd;
        if (!temp.isInBounds(corners)) {
            temp.update(vec, dt);
            if (temp.isInBounds(corners)) {
                return true;
            }
            return false;
        }

        return false;
    }

    // **********
    // JSON Parse
    // **********

    parseGameObject(data) {
        // default values if null (not in json)
        this.pos = {x: data.x ?? 0, y: data.y ?? 0};
        this.width = data.width ?? 10;
        this.height = data.height ?? 10;
        this.spd = data.spd ?? 0;
        this.color = data.color ?? 'white';
    }
}

export { GameObject };