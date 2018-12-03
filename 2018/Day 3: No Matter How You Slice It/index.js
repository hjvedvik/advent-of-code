const lines = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n')
const claims = lines.map(v => v.match(/\d+/g).map(v => parseInt(v, 10)))
const grid = Array.from({ length: 1000 }, v => Array.from({ length: 1000 }, v => new Map()))

claims.forEach(([ id, x, y, w, h ]) => {
  for (let i = x, l = x + w; i < l; i++)
    for (let j = y, k = y + h; j < k; j++)
      grid[i][j].set(id, 1)
})

function part1 () {
  return grid.reduce((n, r) => n + r.filter(c => c.size > 1).length, 0)
}

console.log('part 1:', part1()) // 113716

function part2 () {
  const collides = grid.reduce((acc, r) => {
    return (r.forEach(c => c.size > 1 && acc.push(...c.keys())), acc)
  }, [])

  return claims.filter(([ id ]) => !collides.includes(id)).shift().shift()
}

console.log('part 2:', part2()) // 742
