(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/**
 * Randomize the order of the elements in a given array.
 * @param {Array} arr - The given array.
 * @param {Object} [options] - Optional configuration options.
 * @param {Boolean} [options.copy] - Sets if should return a shuffled copy of the given array. By default it's a falsy value.
 * @param {Function} [options.rng] - Specifies a custom random number generator.
 * @returns {Array}
 */
function shuffle(arr, options) {

  if (!Array.isArray(arr)) {
    throw new Error('shuffle expect an array as parameter.');
  }

  options = options || {};

  var collection = arr,
      len = arr.length,
      rng = options.rng || Math.random,
      random,
      temp;

  if (options.copy === true) {
    collection = arr.slice();
  }

  while (len) {
    random = Math.floor(rng() * len);
    len -= 1;
    temp = collection[len];
    collection[len] = collection[random];
    collection[random] = temp;
  }

  return collection;
};

/**
 * Pick one or more random elements from the given array.
 * @param {Array} arr - The given array.
 * @param {Object} [options] - Optional configuration options.
 * @param {Number} [options.picks] - Specifies how many random elements you want to pick. By default it picks 1.
 * @param {Function} [options.rng] - Specifies a custom random number generator.
 * @returns {Object}
 */
shuffle.pick = function(arr, options) {

  if (!Array.isArray(arr)) {
    throw new Error('shuffle.pick() expect an array as parameter.');
  }

  options = options || {};

  var rng = options.rng || Math.random,
      picks = options.picks || 1;

  if (typeof picks === 'number' && picks !== 1) {
    var len = arr.length,
        collection = arr.slice(),
        random = [],
        index;

    while (picks && len) {
      index = Math.floor(rng() * len);
      random.push(collection[index]);
      collection.splice(index, 1);
      len -= 1;
      picks -= 1;
    }

    return random;
  }

  return arr[Math.floor(rng() * arr.length)];
};

/**
 * Expose
 */
module.exports = shuffle;

},{}],2:[function(require,module,exports){
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
    // '7 - nYFdwBA.jpg',
    // '8 - UUt8J9E.jpg',
    '9 - 6jDvlki.jpg'
]

module.exports = names

},{}],3:[function(require,module,exports){
const numCols = 5
const numRows = 4

const game = () => {
  const grid = Array(numRows).fill().map(() => Array(numCols).fill().map(() => null))

  const emptySpace = { x: numCols - 1, y: numRows - 1 }

  const setGrid = input => {
    if (!Array.isArray(input)) return console.error('input must be an array')
    if (input.length !== 19) return console.log('input must have 19 elements')

    input.map((item, index) => {
      console.log(Math.floor(index / numCols), Math.floor(index % numCols))
      grid[Math.floor(index / numCols)][Math.floor(index % numCols)] = item
    })
  }

  const getGrid = () => {
    console.log(grid)
    return grid
  }

  const move = (x, y) => {
    grid[emptySpace.y][emptySpace.x] = grid[y][x]
    grid[y][x] = null
    emptySpace.x = x
    emptySpace.y = y
  }

  const input = dir => {
    const actions = {
      up: () => {
        if (emptySpace.y === numRows - 1) return console.log('cant')
        move(emptySpace.x, emptySpace.y + 1)
      },
      down: () => {
        if (emptySpace.y === 0) return console.log('cant')
        move(emptySpace.x, emptySpace.y - 1)
      },
      left: () => {
        if (emptySpace.x === numCols - 1) return console.log('cant')
        move(emptySpace.x + 1, emptySpace.y)
      },
      right: () => {
        if (emptySpace.x === 0) return console.log('cant')
        move(emptySpace.x - 1, emptySpace.y)
      },
    }
    const action = actions[dir]

    if (action) action()

    grid.forEach(item => console.log(item))
  }

  return { setGrid, getGrid, input }
}

module.exports = game

},{}],4:[function(require,module,exports){
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

},{"./fileNames":2,"./game":3,"shuffle-array":1}]},{},[4]);
