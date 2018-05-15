export default function (element, options) {
  const moveFn = event => {
    if (options.drag) {
      options.drag(event)
    }
  }
  const downFn = event => {
    if (options.start) {
      options.start(event)
    }
  }
  const upFn = event => {
    document.removeEventListener('mousemove', moveFn)
    document.removeEventListener('mouseup', upFn)
    document.onselectstart = null
    document.ondragstart = null

    if (options.end) {
      options.end(event)
    }
  }

  element.addEventListener('mousedown', event => {
    if (options.stop && options.stop(event, element) === false) {
      return false
    }
    document.onselectstart = () => false
    document.ondragstart = () => false
    document.addEventListener('mousedown', downFn)
    document.addEventListener('mousemove', moveFn)
    document.addEventListener('mouseup', upFn)
    return ''
  })
}
