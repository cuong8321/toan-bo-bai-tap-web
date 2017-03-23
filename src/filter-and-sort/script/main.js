'use strict'
const searchTextBox = document.getElementById('search-textbox')
const searchColumn = document.getElementById('search-column')
const caseSensitiveCheckbox = document.getElementById('case-sensitive-checkbox')
const sortOrder = document.getElementById('sort-order')
const sortColumn = document.getElementById('sort-column')

searchTextBox.addEventListener('keydown', filter, false)
searchTextBox.addEventListener('change', filter, false)
searchTextBox.addEventListener('paste', filter, false)
searchColumn.addEventListener('change', filter, false)
caseSensitiveCheckbox.addEventListener('change', filter, false)

sortOrder.addEventListener('change', sort, false)
sortColumn.addEventListener('change', sort, false)

function filter () {
  const list = Array.from(document.querySelectorAll('table tr'))
  const getText = caseSensitiveCheckbox.checked
    ? string => string
    : string => string.toUpperCase()
  const text = getText(searchTextBox.value)
  const column = searchColumn.value
  const getContentElement = column === 'all'
    ? row => row
    : row => row.querySelector('.' + column)
  list.forEach(row => {
    const content = getContentElement(row)
    row.hidden = getText(content.textContent).indexOf(text) === -1
  })
}
