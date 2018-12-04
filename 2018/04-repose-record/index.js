const lines = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n')
const records = lines.map(v => v.match(/\[.*\]\s(?:\w+\s#\d+\s)?(.*)/)).sort()
const mins = new Array(60).fill(0)
const index = {}

let current, sleeping

for (const [ raw, msg ] of records) {
  const num = +raw.match(/\d+/g).pop()

  if (msg === 'begins shift')
    current = index[num] = (index[num] || { id: num, mins: [...mins] })
  
  if (msg === 'wakes up')
    for (let i = sleeping; i < num; i++) current.mins[i]++
  
  if (msg === 'falls asleep')
    sleeping = num
}

function part1 () {
  const guard = Object.values(index)
    .map(guard => ({ ...guard, total: guard.mins.reduce((a, b) => a + b, 0) }))
    .sort((a, b) => b.total - a.total).shift()
  
  return guard.id * guard.mins.indexOf(Math.max(...guard.mins))
}

console.log('part 1:', part1()) // 26281

function part2 () {
  const guard = Object.values(index)
    .map(guard => ({ ...guard, max: Math.max(...guard.mins) }))
    .sort((a, b) => b.max - a.max).shift()

  return guard.id * guard.mins.indexOf(guard.max)
}

console.log('part 2:', part2()) // 73001
