const input = require('fs').readFileSync('input.txt', 'utf8')
const nums = input.trim().split('\n').map(n => parseInt(n, 10))

const run = (value, seen = new Set([value])) => {
  for (const num of nums) {
    if (seen.has(value += num)) return value
    seen.add(value)
  }

  return run(value, seen)
}

console.log(run(0)) // 341
