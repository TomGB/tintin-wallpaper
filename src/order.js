const shuffleArray = require('shuffle-array')
const fileNames = shuffleArray(require('./fileNames'))
const newGame = require('./game')

const loadImage = async url => {
    const thisImage = new Image()

    thisImage.src = url;

    await new Promise(resolve =>
        thisImage.onload = () => resolve()
    )

    return thisImage
}

const width = window.innerWidth
const height = window.innerHeight
const numCols = 5
const imageWidth = width / numCols
const barHeight = (height - imageWidth * 4) / 2

const draw = ctx => imageGrid => {
    imageGrid.forEach((row, yi) =>
        row.forEach((image, xi) => {
            if (!image) {
                ctx.fillRect(
                    xi * imageWidth - 1,
                    yi * imageWidth + barHeight - 1,
                    imageWidth + 2,
                    width / numCols + 2
                );
                return
            }
            ctx.drawImage(
                image,
                // locX, locY
                xi * imageWidth,
                yi * imageWidth + barHeight,
                // width, height
                imageWidth,
                width / numCols
            );
        })
    )
}

const start = async () => {
    const canvas = document.getElementById('main-canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    const loadingFiles = fileNames.map(async name =>
        await loadImage(`./assets/${name}`)
    )

    const images = await Promise.all(loadingFiles)


    const game = newGame()

    game.setGrid(images)

    draw(ctx)(game.getGrid())

    window.addEventListener('keydown', (e) => {
        const keyActions = {
            ArrowUp: 'up',
            ArrowDown: 'down',
            ArrowLeft: 'left',
            ArrowRight: 'right',
        }

        const action = keyActions[e.key]

        if (action) game.input(action)

        draw(ctx)(game.getGrid())
    })
}

window.onload = start
