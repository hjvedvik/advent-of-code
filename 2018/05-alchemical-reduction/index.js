const input = require('fs').readFileSync('input.txt', 'utf8').trim()
const units = input.split('').map(c => [c.charCodeAt(0), c.toLowerCase().charCodeAt(0)])
const reacts = (a, b) => a && Math.abs(a[0] - b[0]) === 32

function scan (units, skip) {
  const stack = []

  for (const unit of units) {
    if (unit[1] === skip) continue
    else if (reacts(stack[stack.length - 1], unit)) stack.pop()
    else stack.push(unit)
  }

  return stack.length
}

function part1 () {
  return scan(units)
}

console.log('part 1:', part1()) // 11108

function part2 () {
  return [...Array(26).keys()].map(n => (n + 10).toString(36).charCodeAt(0))
    .map(c => scan(units, c))
    .sort((a, b) => a - b)
    .shift()
}

console.log('part 2:', part2()) // 5094
