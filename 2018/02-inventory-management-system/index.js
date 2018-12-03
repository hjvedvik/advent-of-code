const input = require('fs').readFileSync('input.txt', 'utf8')
const ids = input.trim().split('\n').map(v => v.split(''))

function part1 () {
  let i = 0, l = ids.length, two = 0, three = 0, counts

  for (i; i < l; i++) {
    counts = Object.values(ids[i].reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), {}))
    counts.includes(2) && two++
    counts.includes(3) && three++
  }

  return two * three
}

console.log('part 1:', part1()) // 5390

function part2 () {
  let i = 0, l = ids.length, j, diff

  for (i; i < l; i++)
    for (j = i + 1; j < l; j++)
      if ((diff = ids[i].filter((c, i) => c === ids[j][i])).length === ids[i].length - 1)
        return diff.join('')
}

console.log('part 2:', part2()) // nvosmkcdtdbfhyxsphzgraljq
