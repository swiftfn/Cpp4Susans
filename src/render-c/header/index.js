const {createRegistry} = require('../../registry')

const registry = createRegistry([
  require('./class-struct'),
  require('./enum'),
  require('./field'),
  require('./function'),
  require('./method')
])

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
