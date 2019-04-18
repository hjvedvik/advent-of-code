const input = require('fs').readFileSync('input.txt', 'utf8')
const data = input.trim().split(' ').map(v => +v)

function parse (data) {
  const [ l1, l2, sub = [] ] = data.splice(0, 2)

  for (let i = 0; i < l1; i++) sub.push(parse(data))

  let sum = sub.reduce((a, b) => a + b.sum, 0)
  const values = sub.map(c => c.value)
  const metas = data.splice(0, l2)

  for (let i = 0; i < l2; i++) sum += metas[i]

  const value = metas.reduce(
    (a, b) => a += sub.length ? ~~values[b - 1] : b, 0
  )

  return { sum, value }
}

function part1 () {
  return parse(data.slice()).sum
}

console.log('part 1:', part1()) // 36891

function part2 () {
  return parse(data.slice()).value
}

console.log('part 2:', part2()) // 20083
