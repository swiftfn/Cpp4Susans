const {createRegistry} = require('../../registry')
const {renderParts} = require('../../render-util/groups')
const {FILE_NAME: PRIV_FILE_NAME} = require('../priv')

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
#include "${cHeaderFileName}"
#include "${PRIV_FILE_NAME}"

CPP4SUSANS_DEF_MAP_DECL(SkISize, SkISize_struct)
CPP4SUSANS_DEF_MAP_DECL(SkSize, SkSize_struct)`
  )

  for (const d of declarations) {
    parts.push(render(d))
  }

  return renderParts(parts)
}

module.exports = {
  renderCImpl
}
