const input = require('fs').readFileSync('input.txt', 'utf8').trim()

function react (str) {
  for (let i = 0, l = str.length - 1; i < l; i++) {
    if (i < 0 || str[i] === str[i + 1]) continue
    if (str[i].toUpperCase() === str[i + 1] || str[i] === str[i + 1].toUpperCase())
      str = str.slice(0, i) + str.slice(i + 2), i -= 2, l -= 2
  }

  return str
}

function part1 () {
  return react(input).length
}

console.log('part 1:', part1()) // 11108

function part2 () {
  return [...Array(26).keys()].map(n => (n + 10).toString(36))
    .map(c => new RegExp(`${c}|${c.toUpperCase()}`, 'g'))
    .map(r => input.replace(r, ''))
    .map(s => react(s).length)
    .sort((a, b) => a - b)
    .shift()
}

console.log('part 2:', part2()) // 5094
