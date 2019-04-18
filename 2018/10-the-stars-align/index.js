const input = require('fs').readFileSync('input.txt', 'utf8').trim()
const data = input.split('\n').map(v => v.match(/-?\d+/g).map(v => +v))

let second = 1, resolved = { size: Infinity }
let direction = 1, ration = 500

while (true) {
  const next = data.reduce((acc, [x, y, vx, vy]) => {
    const pos = [x + (vx * second), y + (vy * second)]
    
    acc.xmin = Math.min(acc.xmin || pos[0], pos[0])
    acc.xmax = Math.max(acc.xmax || pos[0], pos[0])
    acc.ymin = Math.min(acc.ymin || pos[1], pos[1])
    acc.ymax = Math.max(acc.ymax || pos[1], pos[1])
    acc.vmax = Math.max(acc.vmax || vx, vx)
    acc.size = Math.abs(acc.xmax - acc.xmin) + Math.abs(acc.ymax - acc.ymin)
    acc.points.push(pos)
    
    return acc
  }, { points: [] })

  if (next.size >= resolved.size)
    if (direction !== 1) break
    else direction = -1, ration = 1

  second += direction * ration
  resolved = next
}

function part1 () {
  const { points, xmin, xmax, ymin, ymax } = resolved
  const result = new Array(ymax - ymin + 1).fill('\n')

  for (let y = ymin; y <= ymax; y++)
    for (let x = xmin; x <= xmax; x++)
      result[y - ymin] += points.some(([ x1, x2 ]) => {
        return x1 === x && x2 === y
      }) ? '✶' : '.'

  return result.join('')
}

console.log('part 1:', part1()) // JLPZFJRH ~25ms

console.log('part 2:', second + 1) // 10595
