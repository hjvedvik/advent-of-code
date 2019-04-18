const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n').sort()
const data = input.map(v => [ v[5], v[36] ].map(v => v.charCodeAt(0)))

function part1 () {
  const degrees = {}, edges = {}, queue = [], result = []

  for (const [ dep, step ] of data)
    (edges[dep] = edges[dep] || []).push(step),
    degrees[step] = (degrees[step] || 0) + 1

  for (const dep in edges)
    !degrees[dep] && queue.push(dep)

  while (queue.length) {
    const step = queue.sort().shift()
    for (const dep of edges[step] || [])
      if (degrees[dep] === 1) queue.push(dep)
      else degrees[dep] -= 1
    result.push(step)
  }

  return String.fromCharCode(...result)
}

console.log('part 1:', part1()) // JDEKPFABTUHOQSXVYMLZCNIGRW

function part2 () {
  const stack = [], queue = [], degrees = {}, edges = {}, workers = 5
  const finish = step => stack.push([time + 60 + (step - 64), step])
  
  let time = 0

  for (const [ dep, step ] of data) {
    (edges[dep] = edges[dep] || []).push(step)
    degrees[step] = (degrees[step] || 0) + 1
  }

  for (const dep in edges)
    if (!degrees[dep])
      if (stack.length < workers) finish(+dep)
      else queue.push(+dep)

  while (stack.length || queue.length) {
    const [ t, step ] = stack.shift()
    
    time = t

    for (const dep of edges[step] || [])
      if (degrees[dep] === 1) queue.push(+dep)
      else degrees[dep] -= 1

    while (stack.length < workers && queue.length)
      finish(queue.shift())
  }

  return time
}

console.log('part 2:', part2()) // 1048
