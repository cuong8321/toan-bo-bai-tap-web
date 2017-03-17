'use strict'
main(window)

function main (window) {
  const {document, Math: {random}} = window
  const list = document.getElementById('list')

  addABunchOfListItems()

  function addABunchOfListItems () {
    return repeatAction(createListItem, 15)
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
    const text = document.createElement('span')
    li.appendChild(text)
    text.textContent = randomString(8)
    text.classList.add('text')
    const del = document.createElement('button')
    li.appendChild(del)
    del.textContent = 'Delete'
    del.classList.add('delete')
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
