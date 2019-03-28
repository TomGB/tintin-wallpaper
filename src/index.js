const shuffleArray = require('shuffle-array')
const fileNames = shuffleArray(require('./fileNames'))

const loadImage = async url => {
    const thisImage = new Image()

    thisImage.src = url;

    await new Promise(resolve => 
        thisImage.onload = () => resolve()
    )

    return thisImage
}

const width = 3840,
      height = 2160,
      numCols = 7,
      imageWidth = width / numCols,
      barHeight = (height - imageWidth * 3) / 2

const start = async () => {
    const canvas = document.getElementById('main-canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    console.log(canvas)

    const loadingFiles = fileNames.map(async name => 
        await loadImage(`./assets/${name}`)
    )
    
    const images = await Promise.all(loadingFiles)
    
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

window.onload = start