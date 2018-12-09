const lines = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n')
const records = lines.sort().map(v => v.match(/\[.*\]\s(?:\w+\s#\d+\s)?(.*)/))
const ms = new Array(60).fill(0)
const index = {}

let i, n, guard, sleeping

for (const [ raw, msg ] of records) {
  n = +raw.match(/\d+/g).pop()

  if (msg === 'begins shift') guard = index[n] = (index[n] || { id: n, ms: [...ms] })
  if (msg === 'wakes up') for (i = sleeping; i < n; i++) guard.ms[i]++
  if (msg === 'falls asleep') sleeping = n
}

function part1 () {
  return Object.values(index)
    .map(g => ({ ...g, total: g.ms.reduce((a, b) => a + b, 0) }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 1)
    .reduce((a, { id, ms }) => id * ms.indexOf(Math.max(...ms)), 0)
}

console.log('part 1:', part1()) // 26281

function part2 () {
  return Object.values(index)
    .map(g => ({ ...g, max: Math.max(...g.ms) }))
    .sort((a, b) => b.max - a.max)
    .slice(0, 1)
    .reduce((a, { id, ms, max }) => id * ms.indexOf(max), 0)
}

console.log('part 2:', part2()) // 73001
