var canvas = document.getElementById("canvas")
var width = canvas.width
var height = canvas.height
var ctx = canvas.getContext("2d")
ctx.fillStyle = 'red'

var dobby = {
    x: width / 2,
    y: height / 2,
    size: 50
}

var controllerManager = {
    pressedKeys: {
        up: false,
        down: false,
        left: false,
        right: false
    }
}

function update(dt) {
    if (controllerManager.pressedKeys.up) {
        dobby.y += dt
    }
    if (controllerManager.pressedKeys.down) {
        dobby.y -= dt
    }
    if (controllerManager.pressedKeys.right) {
        dobby.x += dt
    }
    if (controllerManager.pressedKeys.left) {
        dobby.x -= dt
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height)
    drawDobby()
}

function drawDobby() {
    ctx.fillRect(dobby.x - dobby.size/2,
                dobby.y - dobby.size/2,
                dobby.size, dobby.size)
}

function loop(time) {
    var dt = time - lastTime
    update(dt)
    draw()
    
    lastTime = time
    window.requestAnimationFrame(loop)
}

var lastTime = 0
window.requestAnimationFrame(loop)

var keyMap = {
    83: 'up',
    87: 'down',
    65: 'left',
    68: 'right',
}

function keydown(event) {
    var key = keyMap[event.keyCode]
    controllerManager.pressedKeys[key] = true
}

function keyup(event) {
    var key = keyMap[event.keyCode]
    controllerManager.pressedKeys[key] = false
}

window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)