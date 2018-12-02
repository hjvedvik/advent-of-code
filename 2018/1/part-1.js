const input = require('fs').readFileSync('input.txt', 'utf8')
const nums = input.trim().split('\n').map(n => parseInt(n, 10))

const value = nums.reduce((sum, num) => sum + num, 0)

console.log(value) // 427
