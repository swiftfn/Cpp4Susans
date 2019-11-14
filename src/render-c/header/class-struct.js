const {renderGroups, renderParts} = require('../../render-util/groups')

const {renderCoreClassHeader} = require('./core-class')
const {renderCoreStructHeader} = require('./core-struct')

const renderCore = {
  CLASS: renderCoreClassHeader,
  STRUCT: renderCoreStructHeader
}

const renderClassStructHeader = ($, declaration, render) => {
  const {
    type,
    enums, structs, classes,
    staticFields, staticMethods,
    // Non-static fields are handled by renderCoreStructHeader
    constructors, destructors,
    methods, operators
  } = declaration

  const groups1 = [
    enums, structs, classes
  ]

  const groups2 = [
    staticFields, staticMethods,
    constructors, destructors,
    methods, operators
  ]

  return renderParts([
    renderGroups(groups1, render),
    renderCore[type]($, declaration, render),
    renderGroups(groups2, render)
  ])
}

const register = (registry) => {
  registry['CLASS'] = renderClassStructHeader
  registry['STRUCT'] = renderClassStructHeader
}

module.exports = {
  register
}
