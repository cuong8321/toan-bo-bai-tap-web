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
    output.textContent = left && right
      ? fn(...[left, right].map(Number))
      : 'You cannot leave fields empty!'
  }
  document
    .getElementById('calc-' + key + '-button')
    .addEventListener('click', handle, false)
}

for (const event of ['change', 'keydown', 'focus', 'blur']) {
  operandLeft.addEventListener(event, validate, false)
  operandRight.addEventListener(event, validate, false)
}

function validate ({target}) {
  const {value} = target
  const message = document.getElementById(target.id + '-message')
  if (!value) {
    message.textContent = 'This field is empty'
    reenter(target)
  } else if (!isFinite(value)) {
    message.textContent = 'This field is invalid'
    reenter(target)
  } else {
    message.textContent = ''
  }
}

function reenter (input) {
  input.focus()
}
