'use strict'

main(window)

function main ({window, document}) {
  const xmlns = document.documentElement.namespaceURI
  const form = document.getElementById('main-form')

  const dateOfBirth = document.getElementById('date-of-birth')
  const createChild = (name, from, to) => {
    const child = document.createElementNS(xmlns, 'select')
    child.id = dateOfBirth.id + '-' + name
    child.name = name
    const firstoption = document.createElementNS(xmlns, 'option')
    firstoption.value = 0
    firstoption.innerText = name
    child.appendChild(firstoption)
    child.value = 0
    for (const x of range(from, to)) {
      const option = document.createElementNS(xmlns, 'option')
      option.value = x
      option.innerText = x
      child.appendChild(option)
    }
    dateOfBirth.appendChild(child)
  }
  createChild('birthday_year', 1900, new Date().getFullYear() + 1)
  createChild('birthday_month', 1, 13)
  createChild('birthday_day', 1, 32)

  const actionURL = document.getElementById('action-url')
  actionURL.setAttribute('value', form.action)
  actionURL.addEventListener('change', () => {
    form.action = actionURL.value
  }, false)
}

function * range (from, to) {
  for (let x = from; x !== to; ++x) {
    yield x
  }
}
