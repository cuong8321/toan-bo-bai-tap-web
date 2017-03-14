'use strict'

const MIN_PASSWORD_LENGTH = 8

const allInputElementSelectors = {
  all: 'input',
  username: 'input#email',
  password: 'input[type="password"]',
  repassword: 'input#re-password[type="password"]',
  email: 'input[type="email"]'
}

const validate = {
  fn: {
    all: Boolean,
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
    all: 'Cannot leave this field empty',
    username: 'Invalid username',
    password: 'Password must be longer than ' + MIN_PASSWORD_LENGTH,
    repassword: 'Password does not match',
    email: 'Invalid e-mail'
  }
}

for (const name in allInputElementSelectors) {
  const collection = document.querySelectorAll(allInputElementSelectors[name])
  const fn = validate.fn[name]
  const msg = validate.msg[name]
  const event = ['change', 'keydown', 'focus', 'blur']
  const send = (message, input) => {
    console.info({message, input})
  }
  collection.forEach(
    element => event.forEach(
      type => element.addEventListener(
        type,
        ({target}) =>
          fn(target.value) || send(msg, target),
        false
      )
    )
  )
}
