(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const names = [
    '1 - ZkVqQUW.jpg',
    '10 - 9kleEro.jpg',
    '11 - zMpGsgE.jpg',
    '12 - 3xQdOjT.jpg',
    '13 - bbBOi5x.jpg',
    '14 - Tida07M.jpg',
    '15 - 7b6y2ig.jpg',
    '17 - 8948GJo.jpg',
    '18 - vpV77Qj.jpg',
    '2 - 3dGGGRv.jpg',
    '20 - aPm5Jrb.jpg',
    '21 - rjeWd1k.jpg',
    '23 - Qsoq26B.jpg',
    '24 - TOIz6bd.jpg',
    '3 - VEO3QQp.jpg',
    '4 - D18ou7i.jpg',
    '5 - 6CtVc03.jpg',
    '6 - nTrEugv.jpg',
    '7 - nYFdwBA.jpg',
    '8 - UUt8J9E.jpg',
    '9 - 6jDvlki.jpg'
]

module.exports = names

},{}],2:[function(require,module,exports){
const fileNames = require('./fileNames')

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
},{"./fileNames":1}]},{},[2]);
