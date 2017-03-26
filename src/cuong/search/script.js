'use strict'
const input = document.getElementById('search-textbox')
const checkCase = document.getElementById('thuonghoa')
input.addEventListener('change', search, false)
checkCase.addEventListener('change', search, false)
function search () {
  const array = document.querySelectorAll('li')

  const kitucodau = {
    a: 'áàảãạăắằẳẵặâấầẩẫậ',
    d: 'đ',
    e: 'éèẻẽẹêếềểễệ',
    i: 'íìỉĩị',
    o: 'óòỏõọôốồổỗộơờởỡợ',
    u: 'úùủũụưứừửữự',
    y: 'ýỳỷỹỵ'
  }
  for (var i in kitucodau) {
    kitucodau[i.toUpperCase()] = kitucodau[i].toUpperCase()
  }

  const chuoidao = []
  for (var j in kitucodau) {
    for (var k of kitucodau[j]) {
      chuoidao[k] = j
    }
  }

  const a = checkCase.checked
    ? string => string
    : string => string.toUpperCase()

  let input1 = Array.from(input.value)
  for (let y = 0; y < input1.length; y++) {
    input1[y] = (chuoidao[input1[y]] || input1[y])
  }
  const inputText = input1.join('') === input.value ? input1.join('') : input.value

  for (let i of array) {
    let content = Array.from(i.textContent)
    for (let x = 0; x < content.length; x++) {
      content[x] = (chuoidao[content[x]] || content[x])
    }
    const text = input1.join('') === input.value ? content.join('') : i.textContent
    i.hidden = a(text).indexOf(a(inputText)) === -1
  }
}
