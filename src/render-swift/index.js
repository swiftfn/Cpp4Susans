const {getCppHeaderBaseFileName} = require('../file')
const {createRegistry} = require('../registry')

const registry = createRegistry([
  require('./class'),
  require('./enum'),
  require('./function'),
  require('./method'),
  require('./struct')
])

const doRenderSwift = ($, declarations, cppHeaderBaseFileName) => {
  const render = (declaration) => {
    const {type} = declaration
    const renderFunc = registry[type]
    if (!renderFunc) {
      throw new Error(`Invalid declaration type: ${type}`)
    }
    return renderFunc($, declaration, render, cppHeaderBaseFileName)
  }

  let ret = 'import CSkia\n\n'

  for (const d of declarations) {
    ret += render(d)
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
