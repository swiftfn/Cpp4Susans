const {createRegistry} = require('../../registry')

const registry = createRegistry([
  require('./class-struct'),
  require('./function'),
  require('./method')
])

const renderCImpl = ($, declarations, files) => {
  const {cppHeaderFileName, cppHeaderBaseFileName, cHeaderFileName} = files

  const render = (declaration) => {
    const {type} = declaration
    const renderFunc = registry[type]
    if (!renderFunc) {
      throw new Error(`Invalid declaration type: ${type}`)
    }
    return renderFunc($, declaration, render, cppHeaderBaseFileName)
  }

  const parts = []

  parts.push(`#include "${cppHeaderFileName}"
#include "${cHeaderFileName}"`
  )

  for (const d of declarations) {
    parts.push(render(d))
  }

  return parts.filter(text => text.length > 0).join('\n\n')
}

module.exports = {
  renderCImpl
}
