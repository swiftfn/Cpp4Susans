const {getCppHeaderBaseFileName} = require('../file')
const {createRegistry} = require('../registry')
const {indent} = require('./indent')

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

  let ret = 'import CSkia\n\n'

  for (const d of declarations) {
    ret += render(d, true)
  }

  return ret
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
