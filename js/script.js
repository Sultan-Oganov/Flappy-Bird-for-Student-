let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let bird = new Image()
let bg = new Image()
let fg = new Image()
let pipeUp = new Image()
let pipeBottom = new Image()

bird.src = './images/bird.png'
bg.src = './images/bg.png'
fg.src = './images/fg.png'
pipeUp.src = './images/pipeUp.png'
pipeBottom.src = './images/pipeBottom.png'

let pipe = []
pipe[0] = {
    x: canvas.width,
    y: 0
}

let xPos = 10
let yPos = 150
let grav = 2
let otstup = 100
let score = 0

window.addEventListener('keydown', moveUp)

function moveUp() {
    yPos -= 30
}

function draw() {
    ctx.drawImage(bg, 0, 0)

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + otstup)

        pipe[i].x--

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        if (xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + otstup)
            || yPos + bird.height >= canvas.height - fg.height) {
            location.reload()
        }

        if (pipe[i].x == 5) {
            score++
        }


    }

    ctx.drawImage(fg, 0, canvas.height - fg.height)
    ctx.drawImage(bird, xPos, yPos)

    yPos += grav

    ctx.fillStyle = 'black'
    ctx.font = '24px Verdana'
    ctx.fillText('Счёт: ' + score, 10, canvas.height - 20)

    requestAnimationFrame(draw)
}

pipeBottom.onload = draw
