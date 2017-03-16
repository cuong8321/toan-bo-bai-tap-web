main(window)

function main (window) {
  'use strict'
  const {assign} = Object
  const {document, Image} = window
  const {body} = document
  const IMG_CONTAINER_COLS = 4
  const IMG_SIZE = 256
  const IMG_SPACING = 4

  const allWrapper = document.createElement('div')
  const imageContainer = document.createElement('div')
  const changeBorderContainer = document.createElement('div')

  body.appendChild(allWrapper)
  allWrapper.appendChild(imageContainer)
  allWrapper.appendChild(changeBorderContainer)

  assign(allWrapper.style, {
    margin: 'auto',
    width: IMG_CONTAINER_COLS * IMG_SIZE + (IMG_CONTAINER_COLS + 1) * IMG_SPACING + 'px'
  })

  assign(imageContainer.style, {
    columnCount: IMG_CONTAINER_COLS
  })

  for (let i = 0; i !== 8; ++i) {
    const image = new Image(IMG_SIZE, IMG_SIZE)
    const {style} = image
    imageContainer.appendChild(image)
    image.src = `image/${i}.jpg`
    style.margin = style.padding = `${IMG_SPACING >> 1}px`
  }

  const changeBorderInput = document.createElement('input')
  changeBorderContainer.appendChild(changeBorderInput)
  changeBorderInput.addEventListener('change', performChangeBorder, false)
  changeBorderInput.type = 'text'
  changeBorderInput.value = ''
  changeBorderInput.placeholder = 'Image CSS border (e.g. 1px solid black)'
  changeBorderInput.style.width = IMG_SIZE + 'px'

  const changeBorderLink = document.createElement('a')
  changeBorderContainer.appendChild(changeBorderLink)
  changeBorderLink.textContent = 'Change Border'
  changeBorderLink.href = '#'
  changeBorderLink.addEventListener('click', performChangeBorder, false)

  function performChangeBorder () {
    const {value} = changeBorderInput
    for (const {style} of imageContainer.children) {
      style.border = value
    }
  }
}
