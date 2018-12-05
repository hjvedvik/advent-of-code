const input = require('fs').readFileSync('input.txt', 'utf8')
const nums = input.trim().split('\n').map(v => +v)

function part1 () {
  return nums.reduce((sum, num) => sum + num, 0)
}

console.log('part 1:', part1()) // 427

function part2 () {
  const seen = new Set([0])
  let index = -1, sum = 0, length = nums.length

  while (sum += nums[index = (index + 1) % length] || true) {
    if (seen.has(sum)) return sum
    seen.add(sum)
  }
}

console.log('part 2:', part2()) // 341
