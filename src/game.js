var canvas = document.getElementById("canvas")
var width = canvas.width
var height = canvas.height
var ctx = canvas.getContext("2d")
ctx.fillStyle = "red"

var dobby = {
    x: width / 2
    y: height / 2
}

function update(dt) {

}

function draw() {
    //ctx.
}

function loop(time) {
    var dt = time - lastTime
    update(dt)
    draw()

    lastRender = time
    window.requestAnimationFrame(loop)
}

var lastRender = 0
window.requestAnimationFrame(loop)