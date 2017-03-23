'use strict'
const Input = document.getElementById('search-textbox')
const CheckCase = document.getElementById('thuonghoa')
Input.addEventListener('change', search, false)
function search() {
  const array = document.querySelectorAll('li')

  const a = CheckCase.checked
  ? string => string
  : string => string.toUpperCase()
  const text = a(Input.value)
  for(var i of array) {
        i.hidden=  a(i.textContent).indexOf(text)===-1
    }
  }
