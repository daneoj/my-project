import { PhysicsObject } from "./gameobject.js";

class PlayerObject extends PhysicsObject {
    constructor() {
        super();
        this.moveSpd = 0;
    }

    parse(data) {
       this.moveSpd = data.moveSpd;
       super.parse(data); 
    }
}

export {PlayerObject};