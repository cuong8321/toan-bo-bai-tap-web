'use strict'
main(window)

function main (window) {
  const {document, Math: {random}} = window
  const list = document.getElementById('list')
  const listItemCount = document.getElementById('list-item-count')

  const buttonFunctionMap = {
    'select-all': () => {
      for (const checkbox of list.querySelectorAll('.checkbox')) {
        checkbox.checked = true
      }
    },
    'unselect-all': () => {
      for (const checkbox of list.querySelectorAll('.checkbox')) {
        checkbox.checked = false
      }
    },
    'inverse-all': () => {
      for (const checkbox of list.querySelectorAll('.checkbox')) {
        checkbox.checked = !checkbox.checked
      }
    },
    'random-select': () => {
      for (const checkbox of list.querySelectorAll('.checkbox')) {
        checkbox.checked = random() < 0.5
      }
    },
    'clear-selected': () => {
      Array
        .from(list.children)
        .forEach(
          item =>
            item.querySelector('.checkbox').checked && item.remove()
        )
    },
    'clear-all': () => {
      list.textContent = ''
    },
    'add-list-item': addABunchOfListItems
  }

  for (const id in buttonFunctionMap) {
    document
      .getElementById(id)
      .addEventListener('click', buttonFunctionMap[id], false)
  }

  listItemCount.addEventListener(
    'keydown',
    ({keyCode, shiftKey, ctrlKey, altKey}) =>
      keyCode !== 13 || shiftKey || ctrlKey || altKey || addABunchOfListItems(),
    false
  )

  addABunchOfListItems()

  function addABunchOfListItems () {
    const count = parseInt(listItemCount.value)
    return isFinite(count) && repeatAction(createListItem, count)
  }

  function repeatAction (...args) {
    return Array.from(createCountGenerator(...args))
  }

  function createListItem () {
    const li = document.createElement('li')
    list.appendChild(li)

    const checkbox = document.createElement('input')
    li.appendChild(checkbox)
    checkbox.type = 'checkbox'
    checkbox.checked = false
    checkbox.classList.add('checkbox')

    const text = document.createElement('a')
    li.appendChild(text)
    text.textContent = randomString(32)
    text.classList.add('text')

    const del = document.createElement('a')
    li.appendChild(del)
    del.textContent = '[Delete]'
    del.classList.add('delete')
    del.addEventListener('click', () => li.remove(), false)

    return li
  }

  function * createCountGenerator (callback, count = 0) {
    for (let i = 0; i !== count; ++i) {
      yield callback(i, count)
    }
  }

  function randomString (count) {
    return Array
      .from(createCountGenerator(randomChar, count))
      .join('')
  }

  function randomChar () {
    const table = 'abcdefghijklmnopqrstuvwxyz'
    return table[parseInt(random() * table.length)]
  }
}
