module.exports = input => {
  const arr = input.trim().split('\n').map(id => id.split(''))

  const isMatch = (a, b) => a
    .map((char, i) => char === b[i])
    .filter(match => match === false).length === 1

  for (let i = 0, l = arr.length; i < l; i++) {
    for (let j = 0; j < l; j++) {
      if (isMatch(arr[i], arr[j])) {
        return arr[i].filter((char, i) => char === arr[j][i]).join('')
      }
    }
  }
}
