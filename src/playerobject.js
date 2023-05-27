import { PhysicsObject } from "./gameobject.js";

class PlayerObject extends PhysicsObject {
    constructor() {
        super();
        this.moveSpd = 0;
        this.gravAcc = -30;
        this.maxGrav = -12;
        this.hDecel = -40;
        this.hAccel = 40;
        this.hMaxVel = 10; 
        this.jumpVel = 18;
    }

    update(controlVec, dt) {
        this.controls(controlVec, dt);
        this.tickgravity(dt);
        this.tickDecel(dt);
        return [this.vel.x * dt, this.vel.y * dt];
    }

    controls(controlVec, dt) {
        if (this.colliderFlags.bottom) {
            this.vel.y = 0;
        }
        this.vel.x += (controlVec[0] * (this.hAccel - this.hDecel) * dt);
        if (controlVec[1] > 0) {
            if (this.colliderFlags.bottom) {
                this.vel.y = this.jumpVel;
            }
        }
    }

    tickgravity(dt) {
        if (this.colliderFlags.bottom) { return; } // hmm
        if (this.vel.y > this.maxGrav) {
            this.vel.y += (this.gravAcc * dt);
        } else {
            this.vel.y = this.maxGrav;
        }
    }

    tickDecel(dt) {
        if (this.vel.x > this.hMaxVel) this.vel.x = this.hMaxVel;
        if (this.vel.x < -this.hMaxVel) this.vel.x = -this.hMaxVel;
        
        if (this.vel.x > 0) {
            this.vel.x += this.hDecel * dt;
            if (this.vel.x < 0) this.vel.x = 0;
        } else if (this.vel.x < 0) {
            this.vel.x -= this.hDecel * dt;
            if (this.vel.x > 0) this.vel.x = 0;
        }
    }

    parse(data) {
       this.moveSpd = data.moveSpd;
       super.parse(data); 
    }
}

export {PlayerObject};