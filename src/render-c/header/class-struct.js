const {getDataType} = require('../data')
const {renderGroups} = require('../groups')

const {renderClassHeader} = require('./core-class')
const {renderStructHeader} = require('./core-struct')

const doRender = {
  CLASS: renderClassHeader,
  STRUCT: renderStructHeader
}

const renderClassStructHeader = ($, declaration, render) => {
  const {
    type,
    node,
    enums, structs, classes,
    staticFields, staticMethods,
    fields,
    constructors, destructors,
    methods, operators
  } = declaration

  const groups1 = [
    enums,
    structs,
    classes
  ]

  const groups2 = [
    staticMethods,
    constructors,
    destructors,
    methods,
    operators
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
