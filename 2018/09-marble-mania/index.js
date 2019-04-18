const input = require('fs').readFileSync('input.txt', 'utf8')
const [ players, marbles ] = input.trim().match(/\d+/g).map(v => +v)

function play (players, marbles) {
  const scores = new Array(players).fill(0)
  let current = { value: 0, left: null, right: null }

  current.right = current

  for (let i = 1; i <= marbles; i++) {
    if (i % 23 === 0) {
      current = current.left.left.left.left.left.left
      scores[(i - 1) % players] += i + current.left.value
      current.left.left.right = current
      current.left = current.left.left
    } else {
      const next = {
        value: i,
        left: current.right,
        right: current.right.right
      }

      current.right.right.left = next
      current.right.right = next
      current = next
    }
  }

  return Math.max(...scores)
}

console.log('part 1:', play(players, marbles)) // 436720 ~20ms

console.log('part 2:', play(players, marbles * 100)) // 3527845091 ~800ms

// part 1: ~750ms
// part 2: ∞ <
// function play (players, marbles) {
//   const scores = new Array(players).fill(0)
//   let circle = [0]
//
//   for (let i = 1; i <= marbles; i++) {
//     if (i % 23 === 0) {
//       circle.push(...circle.splice(0, 7))
//       scores[(i - 1) % players] += i + circle.pop()
//     } else {
//       circle.unshift(...circle.splice(-2, 2))
//       circle.push(i)
//     }
//   }
//
//   return Math.max(...scores)
// }
