const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n')
const distance = (a, b) => Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1])
const isInf = (x, y) => y === ymin || y === ymax || x === ymin || x === xmax

const { xmin, xmax, ymin, ymax, points } = input
  .map(v => v.split(',').map(v => +v))
  .reduce((acc, [ x, y ], i) => ({
    xmin: Math.min(acc.xmin || x, x), xmax: Math.max(acc.xmax || x, x),
    ymin: Math.min(acc.ymin || y, y), ymax: Math.max(acc.ymax || y, y),
    points: acc.points.concat([[ x, y, i ]])
  }), { points: [] })

function part1 () {
  const tree = insert(points)
  const count = points.map(v => ({ inf: false, count: 0 }))

  for (let x = xmin; x <= xmax; x++) {
    for (let y = ymin; y <= ymax; y++) {
      const result = find([ tree ], [ x, y ])
      const entry = count[result.shift()[2]]
      
      if (!result.length && !entry.inf) {
        entry.inf = entry.inf || isInf(x, y)
        entry.count += 1
      }
    }
  }

  return count
    .filter(entry => !entry.inf)
    .sort((a, b) => b.count - a.count)
    .shift().count
}

console.log('part 1:', part1()) // 3569 ~80ms

function part2 () {
  const map = []
  let i = 0, x = xmin, y = ymin

  while (y <= ymax) {
    map[i] = points.reduce((a, p) => a += distance([ x, y ], p), 0)
    x = xmin + ((i + 1) % (xmax - xmin))
    y = x === xmin ? y + 1 : y
    i++
  }

  return map.filter(v => v < 10000).length
}

console.log('part 2:', part2()) // 48978 ~45ms

function insert (points, depth = 0, axis = depth % 2) {
  if (!points.length) return

  const middle = Math.floor(points.length / 2)
  const sorted = points.slice().sort((a, b) => a[axis] - b[axis])

  return [
    ...sorted[middle],
    insert(sorted.slice(0, middle), depth + 1),
    insert(sorted.slice(middle + 1), depth + 1),
  ]
}

function find (stack, point, depth = 0) {
  if (!stack[0]) return

  const curr = stack[0], axis = depth % 2, less = point[axis] < curr[axis]
  let best = closest(point, find([ curr[less ? 3 : 4] ], point, depth + 1), stack)

  if (distance(point, best[0]) > Math.abs(point[axis] - curr[axis])) {
    best = closest(point, find([ curr[less ? 4 : 3] ], point, depth + 1), best)
  }

  return best
}

function closest (point, a, b) {
  if (!a || !a) return a || b

  const d1 = distance(point, a[0])
  const d2 = distance(point, b[0])

  return d1 === d2 ? a.concat(b) : d1 < d2 ? a : b
}
