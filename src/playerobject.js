import { PhysicsObject } from "./gameobject.js";

class PlayerObject extends PhysicsObject {
    constructor() {
        super();
        this.moveSpd = 0;
        this.gravAcc = -30;
        this.maxGrav = -30;
        this.maxWallSlide = -5;
        this.hDecel = -40;
        this.hAccel = 40;
        this.hAirAccel = 5;
        this.hAirDecel = -5;
        this.hMaxVel = 10; 
        this.jumpVel = 18;
        this.walljumpvVel = 16;
        this.walljumphVel = 12;
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
            if (this.colliderFlags.left) {
                this.vel.y = this.walljumpvVel;
                this.vel.x = this.walljumphVel;
            } else if (this.colliderFlags.right) {
                this.vel.y = this.walljumpvVel;
                this.vel.x = -this.walljumphVel;
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

        if (this.colliderFlags.left || this.colliderFlags.right) {
            if (this.vel.y < this.maxWallSlide) {
                this.vel.y = this.maxWallSlide;
            }
        }
    }

    tickDecel(dt) {
        if (this.vel.x > this.hMaxVel) this.vel.x = this.hMaxVel;
        if (this.vel.x < -this.hMaxVel) this.vel.x = -this.hMaxVel;
        if (this.vel.x > 0) {
            this.vel.x += (this.colliderFlags.bottom ? this.hDecel : this.hAirDecel) * dt;
            if (this.vel.x < 0) this.vel.x = 0;
        } else if (this.vel.x < 0) {
            this.vel.x -= (this.colliderFlags.bottom ? this.hDecel : this.hAirDecel) * dt;
            if (this.vel.x > 0) this.vel.x = 0;
        }
    }

    parse(data) {
       this.moveSpd = data.moveSpd;
       super.parse(data); 
    }
}

export {PlayerObject};