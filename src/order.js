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

const width = 1000,
      height = 1000,
      numCols = 5,
      imageWidth = width / numCols,
      barHeight = (height - imageWidth * 4) / 2

const draw = ctx => images => {
    images.forEach((image, index) => {
        ctx.drawImage(
            image,
            // locX, locY
            index % numCols * imageWidth,
            Math.floor(index / numCols) * imageWidth + barHeight,
            // width, height
            imageWidth,
            width / numCols
        );
    })
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

    draw(ctx)(images)

    const game = newGame()

    game.setGrid(Array(19).fill(1).map((_, i) => i))

    game.getGrid()

    window.addEventListener('keydown', (e) => {
        const keyActions = {
            ArrowUp: 'up',
            ArrowDown: 'down',
            ArrowLeft: 'left',
            ArrowRight: 'right',
        }

        const action = keyActions[e.key]

        if (action) game.input(action)
    })
}

window.onload = start
