var state = {
    x: 0,
    y: 0,
    size: 50,
    spd: 0.45,
    color: 'red'
}

export function drawDobby(ctx) {
    ctx.fillStyle = state.color;
    ctx.fillRect(state.x - state.size/2,
                state.y - state.size/2,
                state.size, state.size);
}

export function updateDobby(vec, dt) {
   state.x += vec[0] * dt * state.spd;
   state.y += vec[1] * dt * state.spd;
}

export { state };