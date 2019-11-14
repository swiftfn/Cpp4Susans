const {createRegistry} = require('../../registry')
const {renderParts} = require('../../render-util/groups')

const registry = createRegistry([
  require('./class-struct'),
  require('./enum'),
  require('./field'),
  require('./function'),
  require('./method')
])

const renderCHeader = ($, declarations, files) => {
  const {cppHeaderBaseFileName} = files
  const headerSignature = `${cppHeaderBaseFileName}_CPP4SUSANS_C_HEADER`

  const render = (declaration) => {
    const {type} = declaration
    const renderFunc = registry[type]
    if (!renderFunc) {
      throw new Error(`Invalid declaration type: ${type}`)
    }
    return renderFunc($, declaration, render, cppHeaderBaseFileName)
  }

  const parts = []

  parts.push(`#ifndef ${headerSignature}
#define ${headerSignature}

#ifdef __cplusplus
extern "C" {
#endif`
  )

  for (const d of declarations) {
    parts.push(render(d))
  }

  parts.push(`#ifdef __cplusplus
}
#endif

#endif`
  )

  return renderParts(parts) + '\n'
}

module.exports = {
  renderCHeader
}
