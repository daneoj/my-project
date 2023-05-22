var controllerManager = {
    pressedKeys: {
        up: false,
        down: false,
        left: false,
        right: false
    }
}

var keyMap = {
    83: 'up',
    87: 'down',
    65: 'left',
    68: 'right',
}

export function getAxes() {
    var vec = [0,0];
    if (controllerManager.pressedKeys.up) {
        vec[1] += 1;
    }
    if (controllerManager.pressedKeys.down) {
        vec[1] -= 1;
    }
    if (controllerManager.pressedKeys.right) {
        vec[0] += 1;
    }
    if (controllerManager.pressedKeys.left) {
        vec[0] -= 1;
    }
    return vec;
}

function keydown(event) {
    controllerManager.pressedKeys[keyMap[event.keyCode]] = true;
}

function keyup(event) {
    controllerManager.pressedKeys[keyMap[event.keyCode]] = false;
}

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);