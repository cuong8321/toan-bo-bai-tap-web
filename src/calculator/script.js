
const a = document.getElementById('number1')
const b = document.getElementById('number2')
const cong = document.getElementById('cong')
const tru = document.getElementById('tru')
const nhan = document.getElementById('nhan')
const chia = document.getElementById('chia')
const output = document.getElementById('kq')

cong.addEventListener('click', () => {
  output.textContent = Number(a.value) + Number(b.value)
}, false)

tru.addEventListener('click', () => {
  output.textContent = Number(a.value) - Number(b.value)
}, false)

nhan.addEventListener('click', () => {
  output.textContent = Number(a.value) * Number(b.value)
}, false)

chia.addEventListener('click', () => {
  output.textContent = Number(a.value) / Number(b.value)
}, false)

a.addEventListener('change', kiemtra, false)
b.addEventListener('change', kiemtra, false)

function kiemtra ({target}) {
  if (isFinite(target.value)) return // !isNaN(target.value)
  target.value = ''
  target.focus()
}
