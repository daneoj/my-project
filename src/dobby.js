class GameObject {
    constructor() {
        this.pos = {x: 0, y: 0};
        this.size = 50;
        this.spd = 0.45;
        this.color = 'red';
    }

    // eventually might want to let graphics lib handle drawing the GameObject
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x - this.size/2,
                    this.pos.y - this.size/2,
                    this.size, this.size);
    }

    update(vec, dt) {
        this.pos.x += vec[0] * dt * this.spd;
        this.pos.y += vec[1] * dt * this.spd;
    }

    getCorners() {
        return [
            [this.pos.x - this.size/2, this.pos.y - this.size/2],
            [this.pos.x - this.size/2, this.pos.y + this.size/2],
            [this.pos.x + this.size/2, this.pos.y - this.size/2],
            [this.pos.x + this.size/2, this.pos.y + this.size/2]
        ];
    }
    // might want to at least handle rectangles instead of squares for GO's collision
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

    // stupidly expensive
    willCollide(vec, dt, corners) {
        var temp = new GameObject();
        temp.pos = { x: this.pos.x, y: this.pos.y };
        temp.size = this.size;
        temp.spd = this.spd;
        if (!temp.isInBounds(corners)) {
            temp.update(vec, dt);
            if (temp.isInBounds(corners)) {
                // we know this movement will cause a collision
                return true;
            }
            return false;
        }

        return false;
    }
}

export { GameObject };