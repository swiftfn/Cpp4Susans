const {createRegistry} = require('../../registry')

const registry = createRegistry([
  require('./class-struct'),
  require('./function'),
  require('./method')
])

const renderCImpl = ($, declarations, cppHeaderFileName, cHeaderFileName) => {
  const render = (declaration) => {
    const {type} = declaration
    const renderFunc = registry[type]
    if (!renderFunc) {
      throw new Error(`Invalid declaration type: ${type}`)
    }
    return renderFunc($, declaration, render)
  }

  let ret = `#include "${cppHeaderFileName}"
#include "${cHeaderFileName}"\n`

  for (const d of declarations) {
    ret += render(d)
  }

  return ret
}

module.exports = {
  renderCImpl
}
