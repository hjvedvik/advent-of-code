module.exports = input => {
  return input.trim().split('\n').reduce((sum, v) => sum + parseInt(v, 10), 0)
}
