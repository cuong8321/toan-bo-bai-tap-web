'use strict'

const input = document.getElementById('input')
const output = document.getElementById('output')

for (const type of ['change', 'paste', 'keydown']) {
  input.addEventListener(type, setTimeout.bind(window, onInputChange), false)
}

function onInputChange () {
  output.textContent = getNonDiaStr(input.value)
}

const diacritic = {
  a: 'áàảãạăắằẳẵặâấầẩẫậ',
  d: 'đ',
  e: 'éèẻẽẹêếềểễệ',
  i: 'íìỉĩị',
  o: 'óòỏõọôốồổỗộơờởỡợ',
  u: 'úùủũụưứừửữự',
  y: 'ýỳỷỹỵ'
}

for (const nonDiaChar in diacritic) {
  diacritic[nonDiaChar.toUpperCase()] = diacritic[nonDiaChar].toUpperCase()
}

const reverseDiacritic = {}

for (const nonDiaChar in diacritic) {
  for (const diaChar of diacritic[nonDiaChar]) {
    reverseDiacritic[diaChar] = nonDiaChar
  }
}

const getNonDiaStr = diaString =>
  Array.from(diaString).map(diaChar => reverseDiacritic[diaChar] || diaChar).join('')
