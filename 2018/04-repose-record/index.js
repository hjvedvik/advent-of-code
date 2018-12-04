const lines = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n')
const records = lines.sort().map(v => v.match(/\[.*\]\s(?:\w+\s#\d+\s)?(.*)/))
const mins = new Array(60).fill(0)
const index = {}

let i, num, current, sleeping

for (const [ raw, msg ] of records) {
  num = +raw.match(/\d+/g).pop()

  if (msg === 'begins shift')
    current = index[num] = (index[num] || { id: num, mins: [...mins] })
  
  if (msg === 'wakes up')
    for (i = sleeping; i < num; i++) current.mins[i]++
  
  if (msg === 'falls asleep')
    sleeping = num
}

function part1 () {
  return Object.values(index)
    .map(guard => ({ ...guard, total: guard.mins.reduce((a, b) => a + b, 0) }))
    .sort((a, b) => b.total - a.total).slice(0, 1)
    .reduce((a, { id, mins }) => id * mins.indexOf(Math.max(...mins)), 0)
}

console.log('part 1:', part1()) // 26281

function part2 () {
  return Object.values(index)
    .map(guard => ({ ...guard, max: Math.max(...guard.mins) }))
    .sort((a, b) => b.max - a.max).slice(0, 1)
    .reduce((a, { id, mins, max }) => id * mins.indexOf(max), 0)
}

console.log('part 2:', part2()) // 73001
