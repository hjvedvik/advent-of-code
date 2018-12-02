const run = (value, nums, seen = new Set([value])) => {
  for (const num of nums) {
    if (seen.has(value += num)) return value
    seen.add(value)
  }

  return run(value, nums, seen)
}

module.exports = run
