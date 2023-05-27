import { PhysicsObject } from "./gameobject.js";

class PlayerObject extends PhysicsObject {
    constructor() {
        super();
        this.moveSpd = 0;
        this.gravAcc = -6;
        this.maxGrav = -8;
        this.hDecel = -16;
        this.hAccel = 20;
        this.hMax = 4; 
    }

    update(controlVec, dt) {
        this.controls(controlVec, dt);
        this.tickgravity(dt);
        this.tickDecel(dt);
        return [this.vel.x * dt, this.vel.y * dt];
    }

    controls(controlVec, dt) {
        this.vel.x += (controlVec[0] * (this.hAccel - this.hDecel) * dt);
        // slightly
    }

    tickgravity(dt) {
        if (this.vel.y > this.maxGrav) {
            this.vel.y += (this.gravAcc * dt);
        } else {
            this.vel.y = this.maxGrav;
        }
    }

    tickDecel(dt) {
        if (this.vel.x > 0) {
            this.vel.x += this.hDecel * dt;
            if (this.vel.x < 0) this.vel.x = 0;
            if (this.vel.x > this.hMax) this.vel.x = this.hMax;
        } else if (this.vel.x < 0) {
            this.vel.x -= this.hDecel * dt;
            if (this.vel.x > 0) this.vel.x = 0;
            if (this.vel.x < -this.hMax) this.vel.x = -this.hMax;
        }
    }

    parse(data) {
       this.moveSpd = data.moveSpd;
       super.parse(data); 
    }
}

export {PlayerObject};