const input = require('fs').readFileSync('input.txt', 'utf8')
const nums = input.trim().split('\n').map(v => parseInt(v, 10))

function part1 () {
  return nums.reduce((sum, num) => sum + num, 0)
}

console.log('part 1:', part1()) // 427

function part2 () {
  const seen = new Set([0])
  let index = 0, sum = 0, l = nums.length

  while ((sum += nums[index]) || true) {
    index = (index + 1) % l
    if (seen.has(sum)) break
    else seen.add(sum)
  }

  return sum
}

console.log('part 2:', part2()) // 341
