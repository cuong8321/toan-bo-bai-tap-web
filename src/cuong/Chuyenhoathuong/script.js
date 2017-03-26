
const text = document.getElementById('text')
const output = document.getElementById('output')

text.addEventListener('change', tinhKetQua, false)
tinhKetQua()

function tinhKetQua () {
  const content = Array.from(text.value)

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

  for (var x = 0; x < content.length; x++) {
    content[x] = (chuoidao[content[x]] || content[x])
  }

  output.textContent = content.join('')
}
