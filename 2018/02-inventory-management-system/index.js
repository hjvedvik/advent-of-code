const input = require('fs').readFileSync('input.txt', 'utf8')
const ids = input.trim().split('\n')

function part1 () {
  let two = 0, three = 0

  for (let i = 0, l = ids.length; i < l; i++) {
    const counts = Object.values(
      ids[i].split('').reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), {})
    )

    counts.includes(2) && two++
    counts.includes(3) && three++
  }

  return two * three
}

console.log('part 1:', part1()) // 5390

function part2 () {
  let matches, a

  const findMatches = (a, b) => a.filter((char, i) => char === b[i])
    
  for (let i = 0, l = ids.length; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      matches = findMatches(a = ids[i].split(''), ids[j].split(''))

      if (matches.length === a.length - 1) {
        return matches.join('')
      }
    }
  }
}

console.log('part 2:', part2()) // nvosmkcdtdbfhyxsphzgraljq
