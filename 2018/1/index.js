const input = require('fs').readFileSync('input.txt', 'utf8')
const nums = input.trim().split('\n').map(n => parseInt(n, 10))
const part1 = require('./part-1')
const part2 = require('./part-2')

console.log('part 1:', part1(0, nums)) // 427
console.log('part 2:', part2(0, nums)) // 341
