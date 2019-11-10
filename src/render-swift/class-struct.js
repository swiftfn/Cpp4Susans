const {renderGroups} = require('../render-util/groups')

const {renderCoreClass} = require('./core-class')
const {renderCoreStruct} = require('./core-struct')

const doRender = {
  CLASS: renderCoreClass,
  STRUCT: renderCoreStruct
}

const renderClassStruct = ($, declaration, render) => {
  const {
    type,
    enums, structs, classes,
    staticFields, staticMethods,
    // Non-static fields are handled by typealias in renderCoreStruct
    constructors, destructors,
    methods, operators
  } = declaration

  const groups = [
    enums, structs, classes,
    staticFields, staticMethods,
    constructors, destructors,
    methods, operators
  ]

  const renderBody = () =>
    renderGroups(groups, render)

  return doRender[type]($, declaration, renderBody)
}

const register = (registry) => {
  registry['CLASS'] = renderClassStruct
  registry['STRUCT'] = renderClassStruct
}

module.exports = {
  register
}
