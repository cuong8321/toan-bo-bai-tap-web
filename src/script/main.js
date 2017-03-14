'use strict'

const operandLeft = document.getElementById('operand-left')
const operandRight = document.getElementById('operand-right')
const output = document.getElementById('output')

const operators = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
}

for (const key in operators) {
  const fn = operators[key]
  const handle = () => {
    const left = operandLeft.value
    const right = operandRight.value
    return left && right
      ? fn(...[left, right].map(Number))
      : 'You cannot leave fields empty!'
  }
  document
    .getElementById('calc-' + key + '-button')
    .addEventListener('click', handle, false)
}

operandLeft.addEventListener('change', validate, false)
operandRight.addEventListener('change', validate, false)

function validate ({target}) {
  if (isFinite(target.value)) return
  target.value = ''
  target.focus()
}
