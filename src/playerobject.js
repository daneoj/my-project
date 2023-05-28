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
        this.hAirAccel = 15;
        this.hAirDecel = -15;
        this.hMaxDriftVel = 10; 
        this.jumpVel = 18;
        this.walljumpvVel = 16;
        this.walljumphVel = 20;
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
        var accel = this.isGrounded() ? this.hAccel : this.hAirAccel;
        var decel = (this.isGrounded() ? this.hDecel : this.hAirDecel)
        var dVx = (controlVec[0] * (accel - decel) * dt);
        if (this.vel.x > this.hMaxDriftVel) {
            if (dVx < 0) {
                this.vel.x += dVx;
            }
        }
        else if (this.vel.x < -this.hMaxDriftVel) {
            if (dVx > 0) {
                this.vel.x += dVx;
            }
        } else {
            this.vel.x += dVx;
        }

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
        if (this.vel.x > 0) {
            this.vel.x += (this.isGrounded() ? this.hDecel : this.hAirDecel) * dt;
            if (this.vel.x < 0) this.vel.x = 0;
        } else if (this.vel.x < 0) {
            this.vel.x -= (this.isGrounded() ? this.hDecel : this.hAirDecel) * dt;
            if (this.vel.x > 0) this.vel.x = 0;
        }
    }

    isGrounded() {
        return this.colliderFlags.bottom;
    }

    parse(data) {
       this.moveSpd = data.moveSpd;
       super.parse(data); 
    }
}

export {PlayerObject};