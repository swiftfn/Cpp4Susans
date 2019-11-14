const {createRegistry} = require('../../registry')
const {renderParts} = require('../../render-util/groups')

const registry = createRegistry([
  require('./class-struct'),
  require('./enum')
])

const renderForwardDeclarations = ($, declarations) => {
  const render = (declaration) => {
    const {type} = declaration
    const renderFunc = registry[type]
    return renderFunc
      ? renderFunc($, declaration, render)
      : ''
  }

  const parts = []
  for (const d of declarations) {
    parts.push(render(d))
  }
  return renderParts(parts) + '\n'
}

module.exports = {
  renderForwardDeclarations
}
