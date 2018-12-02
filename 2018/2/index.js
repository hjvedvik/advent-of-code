const input = require('fs').readFileSync('input.txt', 'utf8')
const ids = input.trim().split('\n')
const part1 = require('./part-1')
const part2 = require('./part-2')

console.log('part 1:', part1(ids)) // 5390
console.log('part 2:', part2(ids)) // nvosmkcdtdbfhyxsphzgraljq
