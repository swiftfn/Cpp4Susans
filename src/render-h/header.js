const {renderClassHeader} = require('./class')
const {renderEnumHeader} = require('./enum')
const {renderFieldHeader} = require('./field')
const {renderMethodHeader} = require('./method')
const {renderStructHeader} = require('./struct')

// For avoiding cyclic dependencies
const registry = {}
require('./class').register(registry)
require('./enum').register(registry)
require('./field').register(registry)
require('./function').register(registry)
require('./method').register(registry)
require('./struct').register(registry)

const renderCHeader = ($, declarations) => {
  const render = (declaration) => {
    const {type} = declaration
    const renderFunc = registry[type]
    if (!renderFunc) {
      throw new Error(`Invalid declaration type: ${type}`)
    }
    return renderFunc($, declaration, render)
  }

  let ret = `#ifdef __cplusplus
extern "C" {
#endif

`
  for (const d of declarations) {
    ret += render(d)
  }

  ret += `

#ifdef __cplusplus
}
#endif
`
  return ret
}

module.exports = {
  renderCHeader
}
