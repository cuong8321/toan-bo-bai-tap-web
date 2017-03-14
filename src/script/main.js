'use strict'

const MIN_PASSWORD_LENGTH = 8

const allInputElementSelectors = {
  all: 'input, select',
  username: 'input#email',
  password: 'input[type="password"]',
  repassword: 'input#re-password[type="password"]',
  email: 'input[type="email"]'
}

const validate = {
  fn: {
    all: element => element.value,
    username: string => /[a-zA-Z0-9-_\.]*/.test(string),
    password: string =>
      string.length > MIN_PASSWORD_LENGTH &&
      [...string].some(char => /[a-z]/.test(char)) &&
      [...string].some(char => /[A-Z]/.test(char)) &&
      [...string].some(char => /[0-9]/.test(char)),
    repassword: string =>
      document.getElementById('password').value === string,
    email: string => {
      const array = string.split('@')
      return array.length === 2 && array.every(validate.fn.username)
    }
  },
  msg: {
    all:
      'Cannot leave this field empty',
    username:
      'Invalid username',
    password:
      'Password must be longer than ' + MIN_PASSWORD_LENGTH +
      ', must contain lowercase letters, uppercase letters, and number characters',
    repassword:
      'Password does not match',
    email:
      'Invalid e-mail'
  }
}

for (const name in allInputElementSelectors) {
  const collection = document.querySelectorAll(allInputElementSelectors[name])
  const fn = validate.fn[name]
  const event = ['change', 'keydown', 'focus', 'blur']
  collection.forEach(
    element => event.forEach(
      type => element.addEventListener(
        type,
        ({target: {value, classList}}) =>
          classList[fn(value) ? 'remove' : 'add']('invalid'),
        false
      )
    )
  )
}

document.getElementById('submit-button').addEventListener('click', onClickedSubmit, false)

function onClickedSubmit (event) {
  event.preventDefault()
  for (const name in allInputElementSelectors) {
    const collection = Array.from(document.querySelectorAll(allInputElementSelectors[name]))
    const fn = validate.fn[name]
    const msg = validate.msg[name]
    const invalid = collection.find(element => !fn(element.value))
    if (invalid) {
      const {id} = invalid
      window.alert(`ERROR: At field '${id}': ${msg}\nPlease edit ${id}`)
      invalid.focus()
      return
    }
  }
  document.getElementById('main-form').submit()
}
