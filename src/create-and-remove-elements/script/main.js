main(window)

function main (window) {
  'use strict'
  const {document, Image} = window
  const {body} = document
  const IMG_CONTAINER_COLS = 4
  const IMG_SIZE = 256
  const IMG_SPACING = 4

  const imageContainer = document.createElement('div')

  body.appendChild(imageContainer)

  Object.assign(imageContainer.style, {
    columnCount: IMG_CONTAINER_COLS,
    width: IMG_CONTAINER_COLS * IMG_SIZE + (IMG_CONTAINER_COLS + 1) * IMG_SPACING + 'px'
  })

  for (let i = 0; i !== 8; ++i) {
    const image = new Image(IMG_SIZE, IMG_SIZE)
    const {style} = image
    imageContainer.appendChild(image)
    image.src = `image/${i}.jpg`
    style.margin = style.padding = `${IMG_SPACING >> 1}px`
  }
}
