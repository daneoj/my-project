import { Logic } from "./logic.js";
import levelData from './levels.js';

function loop(time) {
    var dt = (time - lastTime)/1000; //convert to s
    logic.tick(dt);

    lastTime = time;
    window.requestAnimationFrame(loop);
}

// initialize
var lastTime = 0;

var logic = new Logic();
logic.init(levelData);

window.requestAnimationFrame(loop);