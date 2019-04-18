const input = +require('fs').readFileSync('input.txt', 'utf8').trim()
const sums = new Array(301).fill().map(() => new Array(301).fill(0))
const width = 300, height = 300

const level = (x, y) =>
  Math.floor((((x + 10) * y) + input) * (x + 10) / 100 % 10) - 5

const sum = (x, y, w) =>
  sums[x - 1][y - 1] +
  sums[x + w - 1][y + w - 1] -
  sums[x - 1][y + w - 1] -
  sums[x + w -1][y - 1]

for (let x = width; x > 0; x--)
  for (let y = height; y > 0; y--)
    sums[x - 1][y - 1] =
      level(x, y) +
      sums[x][y - 1] +
      sums[x - 1][y] -
      sums[x][y]

function part1 () {
  let maxSum = 0, maxX = 0, maxY = 0, w = 3, s = 0

  for (let x = 1; x <= width - w; x++)
    for (let y = 1; y <= height - w; y++)
      if ((s = sum(x, y, w)) > maxSum)
        [ maxSum, maxX, maxY ] = [ s, x, y ]

  return [ maxX, maxY ].join(',')
}

console.log('part 1:', part1()) // 21,54 ~20ms

function part2 () {
  let maxSum = 0, maxWidth = 0, maxX = 0, maxY = 0, s = 0

  for (let w = 1; w <= width; w++)
    for (let x = 1; x <= height - w; x++)
      for (let y = 1; y <= width - w; y++)
        if ((s = sum(x, y, w)) > maxSum)
          [ maxSum, maxWidth, maxX, maxY ] = [ s, w, x, y ]

  return [ maxX, maxY, maxWidth ].join(',')
}

console.log('part 2:', part2()) // 236,268,11 ~145ms
