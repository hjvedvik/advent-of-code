module.exports = input => {
  let two = 0, three = 0

  const hasRepeatedChars = (entry, occurences) => {
    return Object.values(entry.reduce((acc, char) => {
      return (acc[char] = (acc[char] || 0) + 1, acc)
    }, {})).includes(occurences)
  }

  input.trim().split('\n').map(id => id.split('')).forEach(entry => {
    hasRepeatedChars(entry, 2) && two++
    hasRepeatedChars(entry, 3) && three++
  })

  return two * three
}
