export class GameObject {
    constructor() {
        this.pos =  {x: 0, y: 0};
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

    // might want to at least handle rectangles instead of squares for GO's wcollision
    isInBounds(corners) {
    corners.array.forEach(element => {
        if (element.x > this.pos.x - this.size/2 &&
            element.x < this.pos.x + this.size/2 &&
            element.y > this.pos.y - this.size/2 &&
            element.y < this.pos.y + this.size/2)  {
                return true;
            }
        });
        return false;
    }
}