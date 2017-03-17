main(window)

function main (window) {
  'use strict'
  const {assign} = Object
  const {document} = window
  const {body} = document
  const IMG_CONTAINER_COLS = 4
  const IMG_SIZE = 256
  const IMG_SPACING = 4

  const allWrapper = createChildElement()
  const imageContainer = createChildElement(allWrapper)
  const changeBorderContainer = createChildElement(allWrapper)
  const headingContainer = createChildElement(allWrapper)
  const changeHeadingContainer = createChildElement(allWrapper)

  assign(allWrapper.style, {
    margin: 'auto',
    width: IMG_CONTAINER_COLS * IMG_SIZE + (IMG_CONTAINER_COLS + 1) * IMG_SPACING + 'px'
  })

  assign(imageContainer.style, {
    columnCount: IMG_CONTAINER_COLS
  })

  for (let i = 0; i !== 8; ++i) {
    const src = `image/${i}.jpg`
    const width = IMG_SIZE
    const height = IMG_SIZE
    const halfspacing = `${IMG_SPACING >> 1}px`
    const style = {margin: halfspacing, padding: halfspacing}
    createChildElement(imageContainer, 'img', {attributes: {src, width, height}, style})
  }

  const changeBorderInput = createChildElement(
    changeBorderContainer, 'input',
    {
      events: {change: performChangeBorder},
      properties: {value: '', placeholder: 'Image CSS border (e.g. 1px solid black)'},
      style: {width: IMG_SIZE + 'px'}
    }
  )

  createChildElement(
    changeBorderContainer, 'a',
    {
      events: {click: performChangeBorder},
      properties: {textContent: 'Change Border', href: '#'}
    }
  )

  const headingLevelInput = createChildElement(
    changeHeadingContainer, 'input',
    {
      properties: {type: 'number', placeholder: 'h', value: 1},
      style: {textAlign: 'right', width: IMG_SIZE + 'px'}
    }
  )

  createChildElement(
    changeHeadingContainer, 'button',
    {
      events: {
        click () {
          const {value} = headingLevelInput
          createChildElement(
            headingContainer, 'h' + value,
            {properties: {textContent: 'Heading ' + value}}
          )
          window.scroll(0, body.scrollHeight)
        }
      },
      properties: {
        textContent: 'Create Heading Element'
      }
    }
  )

  createChildElement(
    changeHeadingContainer, 'button',
    {
      events: {
        click () {
          headingContainer
            .querySelectorAll('h' + headingLevelInput.value)
            .forEach(child => child.remove())
        }
      },
      properties: {
        textContent: 'Clear Heading Element'
      }
    }
  )

  function createChildElement (container = body, tag = 'div', custom = {}) {
    const child = document.createElement(tag)
    container.appendChild(child)
    const {attributes = {}, properties = {}, style = {}, events = {}} = custom
    assign(child, properties)
    for (const name in attributes) {
      child.setAttribute(name, attributes[name])
    }
    assign(child.style, style)
    for (const type in events) {
      child.addEventListener(type, events[type], false)
    }
    return child
  }

  function performChangeBorder () {
    const {value} = changeBorderInput
    for (const {style} of imageContainer.children) {
      style.border = value
    }
  }
}
