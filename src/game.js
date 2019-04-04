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
