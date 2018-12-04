const input = require('fs').readFileSync('input.txt', 'utf8')
const ids = input.trim().split('\n').map(v => v.split(''))

function part1 () {
  return ids.reduce(([ two, three, has2 = 0, has3 = 0 ], line) => {
    for (const c1 of line)
      has2 = !has2 ? line.filter(c2 => c2 === c1).length === 2 : 1,
      has3 = !has3 ? line.filter(c2 => c2 === c1).length === 3 : 1
    
    return [ two + has2, three + has3 ]
  }, [ 0, 0 ]).reduce((a, b) => a *= b, 1)
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
