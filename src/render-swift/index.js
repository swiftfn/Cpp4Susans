const {getCppHeaderBaseFileName} = require('../file')
const {createRegistry} = require('../registry')
const {indent} = require('../render-util/indent')

const registry = createRegistry([
  require('./class-struct'),
  require('./enum'),
  require('./function'),
  require('./method')
])

const doRenderSwift = ($, declarations, cppHeaderBaseFileName) => {
  const render = (declaration, noIndent) => {
    const {type} = declaration
    const renderFunc = registry[type]

    if (!renderFunc) {
      throw new Error(`Invalid declaration type: ${type}`)
    }

    const text = renderFunc($, declaration, render, cppHeaderBaseFileName)
    return noIndent ? text : indent(text)
  }

  const parts = []

  parts.push('import CSkia')

  for (const d of declarations) {
    parts.push(render(d, true))
  }

  return parts.filter(text => text.length > 0).join('\n\n')
}

const renderSwift = ($, declarations, cppHeaderFileName) => {
  const cppHeaderBaseFileName = getCppHeaderBaseFileName(cppHeaderFileName)
  const swiftFileName = `${cppHeaderBaseFileName}.swift`

  return {
    [swiftFileName]: doRenderSwift($, declarations, cppHeaderBaseFileName)
  }
}

module.exports = {
  renderSwift
}
