module.exports = input => {
  const ids = input.trim().split('\n')
  let matches, a

  const findMatches = (a, b) => a.filter((char, i) => char === b[i])
    
  for (let i = 0, l = ids.length; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      matches = findMatches(a = ids[i].split(''), ids[j].split(''))

      if (matches.length === a.length - 1) {
        return matches.join('')
      }
    }
  }
}
