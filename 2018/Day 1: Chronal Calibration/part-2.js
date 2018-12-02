module.exports = input => {
  const nums = input.trim().split('\n').map(v => parseInt(v, 10))
  const seen = new Set([0])
  let index = 0, sum = 0

  while (true) {
    if (seen.has(sum += nums[index])) return sum
    else seen.add(sum)
    
    index = (index + 1) % nums.length
  }
}
