const {createRegistry} = require('../../registry')
const {renderParts} = require('../../render-util/groups')
const {renderMapDecls} = require('./map-decl')

const registry = createRegistry([
  require('./class-struct'),
  require('./function'),
  require('./method')
])

const IGNORED_TYPES = ['ENUMERATION']

const renderImpl = ($, declarations, files) => {
  const {cppHeaderFileName, cppHeaderBaseFileName, cHeaderFileName} = files

  const render = (declaration) => {
    const {type} = declaration
    if (IGNORED_TYPES.includes(type)) {
      return '';
    }

    const renderFunc = registry[type]
    if (!renderFunc) {
      throw new Error(`Invalid declaration type: ${type}`)
    }
    return renderFunc($, declaration, render, cppHeaderBaseFileName)
  }

  const parts = []

  parts.push(`#include "${cppHeaderFileName}"`)
  parts.push(`#include "${cHeaderFileName}"`)
  parts.push(renderMapDecls($, declarations))

  for (const d of declarations) {
    parts.push(render(d))
  }

  return renderParts(parts) + '\n'
}

module.exports = {
  renderImpl
}
