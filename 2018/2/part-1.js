module.exports = ids => {
  let two = 0, three = 0

  const hasRepeatedChars = (string, occurences) => {
    return Object.values(string.split('').reduce((acc, char) => {
      return (acc[char] = (acc[char] || 0) + 1, acc)
    }, {})).includes(occurences)
  }

  ids.forEach(string => {
    hasRepeatedChars(string, 2) && two++
    hasRepeatedChars(string, 3) && three++
  })

  return two * three
}
