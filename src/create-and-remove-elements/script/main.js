main(window)

function main (window) {
  'use strict'
  const {Image} = window

  const imageContainer = document.createElement('div')

  document.body.appendChild(imageContainer)

  imageContainer.style.columnCount = 4

  for (let i = 0; i !== 8; ++i) {
    const image = new Image(256, 256)
    const {style} = image
    imageContainer.appendChild(image)
    image.src = `image/${i}.jpg`
    style.margin = style.padding = '2px'
  }
}
