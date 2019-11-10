const {renderGroups} = require('../../groups')
const {getDataType} = require('../data')

const {renderCoreClassHeader} = require('./core-class')
const {renderCoreStructHeader} = require('./core-struct')

const doRender = {
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

  return `
${renderGroups(groups1, render)}

${doRender[type]($, declaration, render)}

${renderGroups(groups2, render)}
`
}

const register = (registry) => {
  registry['CLASS'] = renderClassStructHeader
  registry['STRUCT'] = renderClassStructHeader
}

module.exports = {
  register
}
