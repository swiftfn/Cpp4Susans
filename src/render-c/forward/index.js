const {createRegistry} = require('../../registry')
const {writeFiles} = require('../../render-util/file')
const {renderParts} = require('../../render-util/groups')

const registry = createRegistry([
  require('./enum'),
  require('./class-struct')
])

const renderForwardDeclarations = ($, declarations) => {
  const render = (declaration) => {
    const {type} = declaration
    const renderFunc = registry[type]
    return renderFunc
      ? renderFunc($, declaration, render).trim()
      : ''
  }

  const parts = []
  for (const d of declarations) {
    parts.push(render(d).trim())
  }
  return renderParts(parts) + '\n'
}

const writeForwardHeader = (allForwardDeclarations) => {
  const parts = []

  parts.push(`#ifndef CPP4SUSANS_FORWARD_HEADER
#define CPP4SUSANS_FORWARD_HEADER

#ifdef __cplusplus
extern "C" {
#endif`
  )

  parts.push(renderParts(allForwardDeclarations))

  parts.push(`#ifdef __cplusplus
}
#endif

#endif`
  )

  const content = renderParts(parts) + '\n'
  writeFiles({'c/include/cpp4susans_forward.h': content})
}

module.exports = {
  renderForwardDeclarations,
  writeForwardHeader
}
