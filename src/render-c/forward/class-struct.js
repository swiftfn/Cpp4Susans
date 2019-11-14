const {renderGroups, renderParts} = require('../../render-util/groups')
const {renderCoreClassHeader} = require('../header/core-class')
const {getCDataType} = require('../data')

const renderCoreStructForwardDeclaration = ($, declaration, render) => {
  const {node} = declaration
  const {name} = getCDataType($, node)
  return `typedef struct ${name} ${name};`
}

const renderCore = {
  CLASS: renderCoreClassHeader,
  STRUCT: renderCoreStructForwardDeclaration
}

const renderClassStructForwardDeclaration = ($, declaration, render) => {
  const {
    type,
    structs, classes
  } = declaration

  return renderParts([
    renderGroups([structs, classes], render),
    renderCore[type]($, declaration, render)
  ])
}

const register = (registry) => {
  registry['CLASS'] = renderClassStructForwardDeclaration
  registry['STRUCT'] = renderClassStructForwardDeclaration
}

module.exports = {
  register
}
