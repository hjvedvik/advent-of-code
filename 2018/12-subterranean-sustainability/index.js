const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n')
const state = input.splice(0, 1).pop().split(': ').pop()
const notes = input.splice(1, input.length).filter(v => /#$/.test(v))
const patterns = new Set(notes.map(v => v.split(' => ').shift()))

const sum = (state, offset) =>
  state.split('').reduce((sum, pot, i) =>
    sum + (pot === '#' ? i - offset : 0), 0)

function spread (gens) {
  let prevPots = 0, prevDiff = 0
  let prevState = `...${state}...`
  let newstate = '...'
  let offset = newstate.length
  
  for (let i = 1; i <= gens; i++) {
    const length = prevState.length
    
    for (let i = 2; i <= length; i++) {
      const current = prevState.substr(i - 2, 5)
      newstate += patterns.has(current) ? '#' : '.'
    }

    prevState = newstate 
    newstate = '...'
    offset += 1

    let pots = sum(prevState, offset)
    let diff = pots - prevPots

    if (diff === prevDiff) {
      return pots + ((gens - i) * diff)
    }

    prevPots = pots
    prevDiff = diff
  }

  return sum(prevState, offset)
}

console.log('part 1:', spread(20)) // 3472

console.log('part 2:', spread(50000000000)) // 2600000000919 ~10ms
