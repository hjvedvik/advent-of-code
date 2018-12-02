module.exports = input => {
  const ids = input.trim().split('\n')
  let two = 0, three = 0

  for (let i = 0, l = ids.length; i < l; i++) {
    const counts = Object.values(
      ids[i].split('').reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), {})
    )

    counts.includes(2) && two++
    counts.includes(3) && three++
  }

  return two * three
}
