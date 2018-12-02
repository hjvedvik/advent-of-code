module.exports = ids => {
  const isMatch = (a, b) => a.split('')
    .map((char, i) => char === b.split('')[i])
    .filter(match => match === false).length === 1

  for (let i = 0, l = ids.length; i < l; i++) {
    for (let j = 0; j < l; j++) {
      if (isMatch(ids[i], ids[j])) {
        const a = ids[i].split(''), b = ids[j].split('')
        return a.filter((char, i) => char === b[i]).join('')
      }
    }
  }
}
