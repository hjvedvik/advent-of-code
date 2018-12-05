const lines = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n')
const claims = lines.map(v => v.match(/\d+/g).map(v => +v))

function part1 () {
  return claims
    .reduce((map, [ id, x, y, w, h ]) => {
      for (let i = x, l = x + w; i < l; i++)
        for (let j = y, k = y + h; j < k; j++)
          map[i][j]++
      return map
    }, [...Array(1000).keys()].map(v => new Array(1000).fill(0)))
    .reduce((n, r) => n + r.filter(c => c > 1).length, 0)
}

console.log('part 1:', part1()) // 113716

function part2 () {
  return claims
    .find(([ id1, x1, y1, w1, h1 ]) => claims
      .every(([ id2, x2, y2, w2, h2 ]) => (
        x1 + w1 - 1 < x2 || x1 > x2 + w2 - 1 ||
        y1 + h1 - 1 < y2 || y1 > y2 + h2 - 1 ||
        id1 === id2
      )))[0]
}

console.log('part 2:', part2()) // 742
